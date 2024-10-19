const express = require("express");
const router = express.Router();
const registerUserPaymentController = require("../Controllers/RegisterUserPaymentController");

// Route to get all user register payments
router.get("/", registerUserPaymentController.getAllUserRegisterPayments);

// Route to add a new user register payment
router.post("/", registerUserPaymentController.addUserRegisterPayment);

// Route to get a user register payment by ID
router.get("/:id", registerUserPaymentController.getUserRegisterPaymentById);

// Route to update a user register payment by ID
router.put("/:id", registerUserPaymentController.updateUserRegisterPayment);

// Route to delete a user register payment by ID
router.delete("/:id", registerUserPaymentController.deleteUserRegisterPayment);

module.exports = router;
