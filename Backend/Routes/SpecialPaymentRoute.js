const express = require("express");
const router = express.Router();
const specialPaymentController = require("../Controllers/SpecialPaymentController");

// Route to get all user register payments
router.get("/", specialPaymentController.getAllSpecialPayments);

// Route to add a new user register payment
router.post("/", specialPaymentController.addSpecialPayment);

// Route to get a user register payment by ID
router.get("/:id", specialPaymentController.getSpecialPaymentById);

// Route to update a user register payment by ID
router.put("/:id", specialPaymentController.updateSpecialPayment);

// Route to delete a user register payment by ID
router.delete("/:id", specialPaymentController.deleteSpecialPayment);

module.exports = router;
