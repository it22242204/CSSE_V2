const Payment = require("../Model/PaymentModel");

const getAllPayments = async (req, res, next) => {
  let payments;
  try {
    payments = await Payment.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payments || payments.length === 0) {
    return res.status(404).json({ message: "No payments found" });
  }
  return res.status(200).json({ payments });
};

const addPayment = async (req, res, next) => {
  const { amount, currency, cardNumber, cardExpiry, cvv, status } = req.body;

  const newPayment = new Payment({
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
  });

  try {
    await newPayment.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  return res.status(201).json({ payment: newPayment });
};

const getPaymentById = async (req, res, next) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await Payment.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ payment });
};

const updatePayment = async (req, res, next) => {
  const id = req.params.id;
  const { amount, currency, cardNumber, cardExpiry, cvv, status } = req.body;

  let payment;
  try {
    payment = await Payment.findByIdAndUpdate(
      id,
      {
        amount,
        currency,
        cardNumber,
        cardExpiry,
        cvv,
        status,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ payment });
};

const deletePayment = async (req, res, next) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await Payment.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ message: "Payment deleted successfully" });
};

module.exports = {
  getAllPayments,
  addPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
};
