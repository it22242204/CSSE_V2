const SpecialPayment = require("../Model/SpecialPaymentModel");

// Get all special payments
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

// Add a new special payment
const addSpecialPayment = async (req, res, next) => {
  const { contactname, amount, currency, cardNumber, cardExpiry, cvv, status, colletionOption } = req.body;

  const newPayment = new SpecialPayment({
    contactname,
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    colletionOption, // Added colletionOption
  });

  try {
    await newPayment.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  return res.status(201).json({ payment: newPayment });
};

// Get a single special payment by ID
const getSpecialPaymentById = async (req, res, next) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await SpecialPayment.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  return res.status(200).json({ payment });
};

// Update a special payment by ID
const updateSpecialPayment = async (req, res, next) => {
  const id = req.params.id;
  const { contactname, amount, currency, cardNumber, cardExpiry, cvv, status, colletionOption } = req.body;

  let payment;
  try {
    payment = await SpecialPayment.findByIdAndUpdate(
      id,
      {
        contactname,
        amount,
        currency,
        cardNumber,
        cardExpiry,
        cvv,
        status,
        colletionOption, // Added colletionOption for update
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

// Delete a special payment by ID
const deleteSpecialPayment = async (req, res, next) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await SpecialPayment.findByIdAndDelete(id);
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