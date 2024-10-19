const express = require('express');
const { getAllPayments, addPayment, getPaymentById, updatePaymentStatus } = require('../Controllers/priceController'); // Adjust the path as necessary
const router = express.Router();

// Define your routes
router.get('/', getAllPayments); // Fetch all payments
router.post('/add', addPayment); // Add a new payment
router.get('/:id', getPaymentById); // Fetch payment by ID
router.patch('/:id/status', updatePaymentStatus); // Update payment status

module.exports = router;
