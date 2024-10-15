const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  locatin: {
    type: String,
    required: false,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
