const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerUserPaymentSchema = new Schema({
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
  name: {
    type: String,
    required: true
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  colletionOption: {
    type: String,
    enum: ['Daily', 'Weekly Once', 'Two Week Once', 'Monthly'],
    required: true
},
});

module.exports = mongoose.model("RegisterUserPayment", registerUserPaymentSchema);
