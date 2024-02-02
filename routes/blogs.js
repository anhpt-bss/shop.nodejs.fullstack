const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

const { helper } = require("../utils/helper");
const middleware = require("../middleware");

// GET: display all blogs
router.get("/", middleware.savePreviousPage, async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 12;
  let page = parseInt(req.query.page) || 1;
  try {
    const blogs = await Blog.find({})
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("banner");

    const count = await Blog.count();

    res.render("pages/blogs", {
      pageName: "Bài Blog",
      blogs,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/blogs/?",
      pages: Math.ceil(count / perPage),
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

// GET: display a certain Blog by its id
router.get("/:id/:slug", middleware.savePreviousPage, async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("banner")
  
    // Get blog posts
    const blogs = await Blog.find({})
    .skip(0)
    .limit(4)
    .sort("createdAt")
    .populate("banner");

    res.render("pages/blog-detail", {
      pageName: blog.title,
      blog,
      blogs,
      successMsg,
      errorMsg,
      helper: helper,
    });
  } catch (error) {
    console.log(error);
    res.redirect(req.session.oldUrl);
  }
});

module.exports = router;
