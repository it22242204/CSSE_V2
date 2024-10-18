// Controller to fetch all waste items
const Payment = require('../Model/PriceModel'); // Ensure your Payment model is correctly imported

// Controller to fetch all payment items
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}); // Fetch all payment items
    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payment items found.' });
    }
    res.status(200).json(payments); // Send the fetched payment data to the client
  } catch (error) {
    console.error('Error fetching payment data:', error);
    res.status(500).json({ message: 'Error fetching payment data.' });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id); // Fetch payment by ID
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Error fetching payment.' });
  }
};

// Controller to add a new payment item
const addPayment = async (req, res) => {
  const { email, wasteDetails, subtotal, address, paymentMethod, cardDetails } = req.body;

  // Validate the input data
  if (!email || !wasteDetails || subtotal < 0 || !paymentMethod) {
    return res.status(400).json({ message: 'Invalid input data.' });
  }

  try {
    const newPayment = new Payment({ email, wasteDetails, subtotal, address, paymentMethod, cardDetails });
    await newPayment.save();
    res.status(201).json({ message: 'Payment item added successfully!', payment: newPayment });
  } catch (error) {
    console.error('Error adding payment item:', error);
    res.status(500).json({ message: 'Error adding payment item.', error });
  }
};

// Export the controller functions
module.exports = { getAllPayments, addPayment , getPaymentById};
