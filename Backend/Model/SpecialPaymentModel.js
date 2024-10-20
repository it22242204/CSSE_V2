const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialPaymentSchema = new Schema({
  contactname: {
    type: String,  // Change to String as contact names are usually text
    required: true,
  },
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
    default: "Paid", // Default status is Paid
  },
  colletionOption: {
    type: String,  // Assuming you want to include the collection option field
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SpecialPayment", specialPaymentSchema);