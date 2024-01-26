const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
  },
  banner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    default: 'Admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  
});

module.exports = mongoose.model("Blog", blogSchema);
