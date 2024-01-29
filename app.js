require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const Category = require("./models/category");
const Product = require("./models/product");
var MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");

const app = express();
require("./config/passport");

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "same-site" }
  })
);

// mongodb configuration
connectDB();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from the "assets" directory
app.use(express.static(__dirname + "/assets"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    //session expires after 3 hours
    cookie: { maxAge: 60 * 1000 * 60 * 3 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;

    // Get list category
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "resources",
          localField: "thumbnail",
          foreignField: "_id",
          as: "thumbnail",
        },
      },
      {
        $addFields: {
          thumbnail: { $arrayElemAt: ["$thumbnail", 0] },
        },
      },
      {
        $lookup: {
          from: "products", // the name of your products collection
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          title: 1,
          slug: 1,
          group: 1,
          thumbnail: 1,
          productCount: { $size: "$products" },
        },
      },
      {
        $sort: { title: 1 },
      },
    ]);

    res.locals.categories = categories;

    // Get list product best sellers
    const productsBestSellers = await Product.find({})
      .sort({ discount: -1 })
      .limit(5)
      .exec();

    res.locals.productsBestSellers = productsBestSellers;

    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// add breadcrumbs
get_breadcrumbs = function (url) {
  var rtn = [{ name: "Home", url: "/" }],
    acc = "", // accumulative url
    arr = url.substring(1).split("/");

  for (i = 0; i < arr.length; i++) {
    acc = i != arr.length - 1 ? acc + "/" + arr[i] : null;
    rtn[i + 1] = {
      name: arr[i].charAt(0).toUpperCase() + arr[i].slice(1),
      url: acc,
    };
  }
  return rtn;
};
app.use(function (req, res, next) {
  req.breadcrumbs = get_breadcrumbs(req.originalUrl);
  next();
});

//routes config
const indexRouter = require("./routes/index");
const pagesRouter = require("./routes/pages");
const usersRouter = require("./routes/user");
const productsRouter = require("./routes/products");
const blogsRouter = require("./routes/blogs");
app.use("/blogs", blogsRouter);
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/pages", pagesRouter);
app.use("/", indexRouter);

// Proxy endpoint to fetch and serve images from Google Photos
app.get('/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url; // Get the image URL from the query parameters
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const contentType = response.headers['content-type'];
    res.header('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var port = process.env.PORT || 3000;
app.set("port", port);
app.listen(port, () => {
  console.log("Server running at port " + port);
});

module.exports = app;
