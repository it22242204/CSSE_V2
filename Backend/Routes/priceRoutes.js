//priceRoute.js
const express = require('express');
const { getAllPayments, addPayment , getPaymentById} = require('../Controllers/priceController'); // Adjust the path as necessary
const router = express.Router();

// Define your routes
router.get('/', getAllPayments); // Fetch all payments
router.post('/add', addPayment); // Add a new payment

module.exports = router;
