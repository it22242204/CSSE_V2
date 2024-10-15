const express = require("express");
const router = express.Router();
const Cart = require("../Model/CartManagementModel");
const cartController = require("../Controllers/CartManagementController");

router.get("/", cartController.getAllCarts);
router.post("/", cartController.addCart);
router.get("/:id", cartController.getCartById);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
