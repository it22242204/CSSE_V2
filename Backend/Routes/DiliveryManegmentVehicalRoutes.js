const express = require("express");
const router = express.Router();
//Insert Controller
const VehicalController = require("../Controllers/DiliveryManegmentVehicalControllers");

router.get("/", VehicalController.getAllVehical);
router.post("/", VehicalController.addVehical);
router.get("/:id", VehicalController.getById);
router.put("/:id", VehicalController.updateVehical);
router.delete("/:id", VehicalController.deleteVehical);

//export
module.exports = router;
