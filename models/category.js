const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
  },
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  },
  group: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Category", categorySchema);
