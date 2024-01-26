const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotDealsSchema = Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  description: {
    type: String,
    required: false,
  },
  startAt: {
    type: Date,
    required: true,
  },
  finishAt: {
    type: Date,
    required: true,
  },
  numberSold: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("HotDeals", hotDealsSchema);
