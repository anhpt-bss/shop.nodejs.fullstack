const express = require("express");
const csrf = require("csurf");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Product = require("../models/product");
const Category = require("../models/category");
const Cart = require("../models/cart");
const Order = require("../models/order");
const HotDeals = require("../models/hotDeals");
const Blog = require("../models/blog");

const middleware = require("../middleware");
const router = express.Router();

const {
  checkoutValidationRules,
  validateCheckout,
} = require("../config/validator");

const csrfProtection = csrf();
router.use(csrfProtection);

const { helper } = require("../utils/helper");

// GET: home page
router.get("/",  middleware.savePreviousPage, async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];

  try {
    const products = await Product.find({})
      .skip(0)
      .limit(12)
      .populate("category");

    const newArrivalsProducts = await Product.find({})
      .sort("-createdAt")
      .skip(0)
      .limit(8)
      .populate("category");

    const trendingProducts = await Product.find({})
      .sort("-numberRating")
      .skip(0)
      .limit(8)
      .populate("category");

    const topRatedProducts = await Product.find({})
      .sort("-rating")
      .skip(0)
      .limit(8)
      .populate("category");

    // Get hot deals product with number of already sold
    const currentDateTime = new Date();
    const hotDealsProducts = await HotDeals.aggregate([
      {
        $match: {
          startAt: { $lte: currentDateTime },
          finishAt: { $gte: currentDateTime },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          productDetails: { $arrayElemAt: ["$productDetails", 0] },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.category",
          foreignField: "_id",
          as: "productDetails.category",
        },
      },
      {
        $addFields: {
          "productDetails.category": {
            $cond: {
              if: { $isArray: "$productDetails.category" },
              then: { $arrayElemAt: ["$productDetails.category", 0] },
              else: "$productDetails.category",
            },
          },
        },
      },
      {
        $lookup: {
          from: "orders",
          let: {
            productId: "$productId",
            hotDealStartAt: "$startAt",
            hotDealFinishAt: "$finishAt",
          },
          pipeline: [
            {
              $unwind: "$cart.items",
            },
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$cart.items.productId", "$$productId"] },
                    { $gte: ["$createdAt", "$$hotDealStartAt"] },
                    { $lte: ["$createdAt", "$$hotDealFinishAt"] },
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalQtySold: { $sum: "$cart.items.qty" },
              },
            },
          ],
          as: "soldDetails",
        },
      },
      {
        $addFields: {
          alreadySold: {
            $ifNull: [{ $arrayElemAt: ["$soldDetails.totalQtySold", 0] }, 0],
          },
        },
      },
      {
        $sort: { finishAt: 1 },
      },
    ]);

    // Get blog posts
    const blogs = await Blog.find({})
      .sort("createdAt")
      .skip(0)
      .limit(4)
      .populate("banner");

    res.render("shop/home", {
      pageName: "Trang Chủ",
      successMsg,
      errorMsg,
      products,
      newArrivalsProducts,
      trendingProducts,
      topRatedProducts,
      hotDealsProducts,
      blogs,
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

// GET: add a product to the shopping cart when "Add to cart" button is pressed
router.get("/add-to-cart/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    // get the correct cart, either from the db, session, or an empty cart.
    let user_cart;
    if (req.user) {
      user_cart = await Cart.findOne({ user: req.user._id });
    }
    let cart;
    if (
      (req.user && !user_cart && req.session.cart) ||
      (!req.user && req.session.cart)
    ) {
      cart = await new Cart(req.session.cart);
    } else if (!req.user || !user_cart) {
      cart = new Cart({});
    } else {
      cart = user_cart;
    }

    // add the product to the cart
    const product = await Product.findById(productId);
    const itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      // if product exists in the cart, update the quantity
      cart.items[itemIndex].qty++;
      cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price;
      cart.items[itemIndex].discount =
        cart.items[itemIndex].qty * product.discount;
      cart.totalQty++;
      cart.totalCost +=
        product.price - product.price * (product.discount / 100);
    } else {
      // if product does not exists in cart, find it in the db to retrieve its price and add new item
      cart.items.push({
        productId: productId,
        productCode: product.productCode,
        title: product.title,
        qty: 1,
        price: product.price,
        discount: product.discount,
      });
      cart.totalQty++;
      cart.totalCost +=
        product.price - product.price * (product.discount / 100);
    }

    // if the user is logged in, store the user's id and save cart to the db
    if (req.user) {
      cart.user = req.user._id;
      await cart.save();
    }
    req.session.cart = cart;
    req.flash("success", "Sản phẩm đã được thêm vào giỏ hàng!");
    res.redirect(req.session.oldUrl);
  } catch (err) {
    console.log(err.message);
    res.redirect(req.session.oldUrl);
  }
});

// GET: view shopping cart contents
router.get("/shopping-cart", middleware.savePreviousPage, async (req, res) => {
  try {
    // find the cart, whether in session or in db based on the user state
    let cart_user;
    if (req.user) {
      cart_user = await Cart.findOne({ user: req.user._id });
    }
    // if user is signed in and has cart, load user's cart from the db
    if (req.user && cart_user) {
      req.session.cart = cart_user;
      return res.render("shop/shopping-cart", {
        cart: cart_user,
        pageName: "Giỏ Hàng",
        products: await productsFromCart(cart_user),
        helper: helper,
      });
    }
    // if there is no cart in session and user is not logged in, cart is empty
    if (!req.session.cart) {
      return res.render("shop/shopping-cart", {
        cart: null,
        pageName: "Giỏ Hàng",
        products: null,
      });
    }
    // otherwise, load the session's cart
    return res.render("shop/shopping-cart", {
      cart: req.session.cart,
      pageName: "Giỏ Hàng",
      products: await productsFromCart(req.session.cart),
      helper: helper,
    });
  } catch (err) {
    console.log(err.message);
    res.redirect(req.session.oldUrl);
  }
});

// GET: reduce one from an item in the shopping cart
router.get("/reduce/:id", async function (req, res, next) {
  // if a user is logged in, reduce from the user's cart and save
  // else reduce from the session's cart
  const productId = req.params.id;
  let cart;
  try {
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else if (req.session.cart) {
      cart = await new Cart(req.session.cart);
    }

    // find the item with productId
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      // find the product to find its price
      const product = await Product.findById(productId);
      // if product is found, reduce its qty
      cart.items[itemIndex].qty--;
      cart.items[itemIndex].price -= product.price;
      cart.totalQty--;
      cart.totalCost -= product.price;
      // if the item's qty reaches 0, remove it from the cart
      if (cart.items[itemIndex].qty <= 0) {
        await cart.items.remove({ _id: cart.items[itemIndex]._id });
      }
      req.session.cart = cart;
      //save the cart it only if user is logged in
      if (req.user) {
        await cart.save();
      }
      //delete cart if qty is 0
      if (cart.totalQty <= 0) {
        req.session.cart = null;
        await Cart.findByIdAndRemove(cart._id);
      }
    }
    res.redirect(req.session.oldUrl);
  } catch (err) {
    console.log(err.message);
    res.redirect(req.session.oldUrl);
  }
});

// GET: remove all instances of a single product from the cart
router.get("/removeAll/:id", async function (req, res, next) {
  const productId = req.params.id;
  let cart;
  try {
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else if (req.session.cart) {
      cart = await new Cart(req.session.cart);
    }
    //fnd the item with productId
    let itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      //find the product to find its price
      cart.totalQty -= cart.items[itemIndex].qty;
      cart.totalCost -= cart.items[itemIndex].price;
      await cart.items.remove({ _id: cart.items[itemIndex]._id });
    }
    req.session.cart = cart;
    //save the cart it only if user is logged in
    if (req.user) {
      await cart.save();
    }
    //delete cart if qty is 0
    if (cart.totalQty <= 0) {
      req.session.cart = null;
      await Cart.findByIdAndRemove(cart._id);
    }
    res.redirect(req.session.oldUrl);
  } catch (err) {
    console.log(err.message);
    res.redirect(req.session.oldUrl);
  }
});

// GET: checkout form with csrf token
router.get("/checkout", middleware.isLoggedIn, middleware.savePreviousPage, async (req, res) => {
  const errorMsg = req.flash("error")[0];

  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }

  //load the cart with the session's cart's id from the db
  cart = await Cart.findById(req.session.cart._id);

  if (!cart) {
    return res.redirect("/shopping-cart");
  }

  res.render("shop/checkout", {
    total: cart.totalCost,
    csrfToken: req.csrfToken(),
    errorMsg,
    pageName: "Thanh Toán",
    helper: helper,
  });
});

// POST: handle checkout logic and payment using Stripe
router.post(
  "/checkout",
  [middleware.isLoggedIn, checkoutValidationRules(), validateCheckout],
  async (req, res) => {
    try {
      if (!req.session.cart) {
        return res.redirect("/shopping-cart");
      }
      const cart = await Cart.findById(req.session.cart._id);

      if (req.body.paymentMethod === "cast") {
        const order = new Order({
          user: req.user,
          cart: {
            totalQty: cart.totalQty,
            totalCost: cart.totalCost,
            items: cart.items,
          },
          phone: req.body.phone,
          address: req.body.address,
          note: req.body.note,
          paymentMethod: req.body.paymentMethod,
          paymentId: null,
        });
        order.save(async (err, newOrder) => {
          if (err) {
            console.log(err);
            return res.redirect("/checkout");
          }
          await cart.save();
          await Cart.findByIdAndDelete(cart._id);
          req.flash("success", "Đặt hàng thành công!");
          req.session.cart = null;
          res.redirect("/user/profile");
        });
      } else if (req.body.paymentMethod === "stripe") {
        stripe.charges.create(
          {
            amount: cart.totalCost * 100,
            currency: "usd",
            source: req.body.stripeToken,
            description: "Test charge",
          },
          function (err, charge) {
            if (err) {
              req.flash("error", err.message);
              console.log(err);
              return res.redirect("/checkout");
            }
            const order = new Order({
              user: req.user,
              cart: {
                totalQty: cart.totalQty,
                totalCost: cart.totalCost,
                items: cart.items,
              },
              phone: req.body.phone,
              address: req.body.address,
              note: req.body.note,
              paymentMethod: req.body.paymentMethod,
              paymentId: charge.id,
            });
            order.save(async (err, newOrder) => {
              if (err) {
                console.log(err);
                return res.redirect("/checkout");
              }
              await cart.save();
              await Cart.findByIdAndDelete(cart._id);
              req.flash("success", "Đặt hàng thành công!");
              req.session.cart = null;
              res.redirect("/user/profile");
            });
          }
        );
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect(req.session.oldUrl);
    }
  }
);

// create products array to store the info of each product in the cart
async function productsFromCart(cart) {
  let products = []; // array of objects
  for (const item of cart.items) {
    let foundProduct = (
      await Product.findById(item.productId).populate("category")
    ).toObject();
    const totalPrice = foundProduct.price * item.qty;

    foundProduct["qty"] = item.qty;
    foundProduct["totalPrice"] =
      totalPrice - totalPrice * (foundProduct.discount / 100);
    products.push(foundProduct);
  }
  return products;
}

module.exports = router;
