const express = require("express");
const router = express.Router();
//Insert Controller
const SupplierController = require("../Controllers/SupplyManegmentControllers");

router.get("/", SupplierController.getAllSupplier);
router.post("/", SupplierController.addSupplier);
router.get("/:id", SupplierController.getById);
router.put("/:id", SupplierController.updateSupplier);
router.delete("/:id", SupplierController.deleteSupplier);

//export
module.exports = router;
