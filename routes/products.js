const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/category");
const Interaction = require("../models/interaction");
var moment = require("moment");
const middleware = require("../middleware");
const { helper } = require("../utils/helper");
const {
  feedbackValidationRules,
  validateFeedback,
} = require("../config/validator");

// GET: display all products
router.get("/", middleware.savePreviousPage, async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 12;
  let page = parseInt(req.query.page) || 1;
  try {
    let products = [];
    let count = 0;

    switch (req.query.filter) {
      case "new-arrivals":
        products = await Product.find({})
          .sort("-createdAt")
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("category");

        count = await Product.count();
        break;

      case "trending":
        products = await Product.find({})
          .sort("-numberRating")
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("category");

        count = await Product.count();
        break;

      case "top-rated":
        products = await Product.find({})
          .sort("-rating")
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("category");

        count = await Product.count();
        break;

      case "best-seller":
        products = await Product.find({})
          .sort("-discount")
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("category");

        count = await Product.count();
        break;

      default:
        products = await Product.find({})
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("category");

        count = await Product.count();
        break;
    }

    res.render("shop/products", {
      pageName: "Tất Cả Sản Phẩm",
      products,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: req.query.filter
        ? `/products?filter=${req.query.filter}&`
        : "/products/?",
      pages: Math.ceil(count / perPage),
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

// GET: search box
router.get("/search", middleware.savePreviousPage, async (req, res) => {
  const perPage = 12;
  let page = parseInt(req.query.page) || 1;
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];

  try {
    const products = await Product.find({
      title: { $regex: req.query.search, $options: "i" },
    })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category")
      .exec();
    const count = await Product.count({
      title: { $regex: req.query.search, $options: "i" },
    });
    res.render("shop/products", {
      pageName: "Kết Quả Tìm Kiếm",
      products,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/products/search?search=" + req.query.search + "&",
      pages: Math.ceil(count / perPage),
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

//GET: get a certain category by its slug (this is used for the categories navbar)
router.get("/:slug", middleware.savePreviousPage, async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 12;
  let page = parseInt(req.query.page) || 1;
  try {
    const foundCategory = await Category.findOne({ slug: req.params.slug });
    let allProducts = [];
    let count = 0;

    if (foundCategory.group && foundCategory.group !== "") {
      allProducts = await Product.find({ category: foundCategory.id })
        .sort("-createdAt")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .populate("category");

      count = await Product.count({ category: foundCategory.id });
    } else {
      allProducts = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $match: {
            "category.group": foundCategory.title,
          },
        },
        {
          $addFields: {
            category: { $arrayElemAt: ["$category", 0] },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: perPage * page - perPage,
        },
        {
          $limit: perPage,
        },
      ]);

      count = await Product.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $match: {
            "category.group": foundCategory.title,
          },
        },
        {
          $count: "totalCount",
        },
      ]);

      count = count.length > 0 ? count[0].totalCount : 0;
    }

    res.render("shop/products", {
      pageName: foundCategory.title,
      currentCategory: foundCategory,
      products: allProducts,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: req.breadcrumbs,
      home: "/products/" + req.params.slug.toString() + "/?",
      pages: Math.ceil(count / perPage),
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

// GET: display a certain product by its id
router.get("/:slug/:id", middleware.savePreviousPage, async (req, res) => {
  const currentUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const user = req.user
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];

  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("imageGallery");
    const feedbacks = await Interaction.find({product: req.params.id, type: 'review'})
      .sort('-createdAt')
      .populate("user");

    res.render("shop/product-detail", {
      pageName: product.title,
      currentUrl,
      user,
      product,
      feedbacks,
      successMsg,
      errorMsg,
      moment: moment,
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

// POST: handle feedback logic
router.post(
  "/feedback/:id",
  [middleware.isLoggedIn, feedbackValidationRules(), validateFeedback],
  async (req, res) => {
    try {

      const interaction = new Interaction({
        user: req.user,
        product: req.params.id,
        rating: req.body.rating,
        content: req.body.content,
      });

      interaction.save(async (err, newInteraction) => {
        if (err) {
          console.log(err);
          return res.redirect(req.originalUrl);
        }
     
        req.flash("success", "Gửi đánh giá về sản phẩm thành công!");
        return res.redirect(req.originalUrl);
      });
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect(req.session.oldUrl);
    }
  }
);

module.exports = router;
