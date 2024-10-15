const express = require("express");
const router = express.Router();
//Insert Controller
const DriveController = require("../Controllers/DiliveryManegmentDriverControllers");

router.get("/", DriveController.getAllDrive);
router.post("/", DriveController.addDrive);
router.get("/:id", DriveController.getById);
router.put("/:id", DriveController.updateDrive);
router.delete("/:id", DriveController.deleteDrive);

//export
module.exports = router;
