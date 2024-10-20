const RegisterUserPayment = require("../Model/RegisterUserPaymentModel");

// Get all user register payments
const getAllUserRegisterPayments = async (req, res, next) => {
  let payments;
  try {
    payments = await RegisterUserPayment.find();
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
const addUserRegisterPayment = async (req, res, next) => {
  const { amount, currency, cardNumber, cardExpiry, cvv, status,name,colletionOption } = req.body;

  const newPayment = new RegisterUserPayment({
    amount,
    currency,
    cardNumber,
    cardExpiry,
    cvv,
    status,
    name,
    colletionOption,
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
const getUserRegisterPaymentById = async (req, res, next) => {
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
const updateUserRegisterPayment = async (req, res, next) => {
  const id = req.params.id;
  const { amount, currency, cardNumber, cardExpiry, cvv, status,name,colletionOption } = req.body;

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
        name,
        colletionOption,
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
const deleteUserRegisterPayment = async (req, res, next) => {
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
  getAllUserRegisterPayments,
  addUserRegisterPayment,
  getUserRegisterPaymentById,
  updateUserRegisterPayment,
  deleteUserRegisterPayment,
};