const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
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
  // Field to store cart items
  cartItems: [
    {
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
