const SpecialPayment = require("../Model/SpecialPaymentModel");

// Get all user register payments
const getAllSpecialPayments = async (req, res, next) => {
  let payments;
  try {
    payments = await SpecialPayment.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payments || payments.length === 0) {
    return res.status(404).json({ message: "No payments found" });
  }
  return res.status(200).json({ payments });
};

// Add a new user register payment
const addSpecialPayment = async (req, res, next) => {
  const { amount, currency, cardNumber, cardExpiry, cvv, status } = req.body;

  const newPayment = new SpecialPayment({
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
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  return res.status(201).json({ payment: newPayment });
};

// Get a single user register payment by ID
const getSpecialPaymentById = async (req, res, next) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await RegisterUserPayment.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ payment });
};

// Update a user register payment by ID
const updateSpecialPayment = async (req, res, next) => {
  const id = req.params.id;
  const { amount, currency, cardNumber, cardExpiry, cvv, status } = req.body;

  let payment;
  try {
    payment = await RegisterUserPayment.findByIdAndUpdate(
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
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ payment });
};

// Delete a user register payment by ID
const deleteSpecialPayment = async (req, res, next) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await RegisterUserPayment.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ message: "Payment deleted successfully" });
};

module.exports = {
  getAllSpecialPayments,
  addSpecialPayment,
  getSpecialPaymentById,
  updateSpecialPayment,
  deleteSpecialPayment,
};
