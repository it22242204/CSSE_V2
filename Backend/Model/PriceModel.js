//models/RecyclePrice.js
const mongoose = require('mongoose');

const recyclePriceSchema = new mongoose.Schema({
  email: { type: String, required: true },
  wasteDetails: [
    {
      name: { type: String, required: true },
      pricePerKg: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  cardDetails: [
    {
      accountname: { type: String },
      bankname: { type: String },
      accountnumber: { type: String },
    },
  ],
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const Payment = mongoose.model('Price', recyclePriceSchema)

module.exports = Payment;

