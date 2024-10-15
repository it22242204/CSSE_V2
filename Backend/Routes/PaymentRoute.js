const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/PaymentController");

router.get("/", paymentController.getAllPayments);
router.post("/", paymentController.addPayment);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
