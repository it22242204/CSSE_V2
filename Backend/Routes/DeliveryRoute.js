const express = require("express");
const router = express.Router();
const DeliveryController = require("../Controllers/DeliveryController");

router.get("/", DeliveryController.getAllDeliveries);
router.get("/:id", DeliveryController.getDeliveryById);
router.post("/", DeliveryController.addDelivery);
router.put("/:id", DeliveryController.updateDelivery);
router.delete("/:id", DeliveryController.deleteDelivery);

module.exports = router;
