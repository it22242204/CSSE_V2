const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialPaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cardExpiry: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SpecialPayment", specialPaymentSchema);
