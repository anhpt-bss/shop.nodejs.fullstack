const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = Schema({
  fileName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Resource", resourceSchema);
