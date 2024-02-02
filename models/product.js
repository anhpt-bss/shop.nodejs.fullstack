const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const faker = require("faker");

const productSchema = Schema({
  productCode: {
    type: String,
    required: false,
    unique: true,
    default: faker.helpers.replaceSymbolWithNumber("####-##########")
  },
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  imageGallery: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  }],
  summary: {
    type: String,
    required: false,
    default: null
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  manufacturer: {
    type: String,
    default: 'Việt Nam'
  },
  available: {
    type: Number,
    required: true,
    default: 100
  },
  rating: {
    type: Number,
    required: true,
    default: 5
  },
  numberRating: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
