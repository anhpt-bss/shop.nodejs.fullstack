const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interactionSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  type: {
    type: String,
    required: true,
    default: 'review' // review|reaction|saved|view
  },
  rating: {
    type: Number,
    require: false
  },
  content: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  
});

module.exports = mongoose.model("Interaction", interactionSchema);
