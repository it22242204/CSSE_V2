const express = require("express");
const router = express.Router();
//Insert Controller
const DriveController = require("../Controllers/DiliveryManegmentDriverControllers");

router.get("/", DriveController.getAllDrive);
router.post("/", DriveController.addDrive);
router.get("/:id", DriveController.getById);
router.put("/:id", DriveController.updateDrive);
router.put('/:id/assign', (req, res) => {
    const driverId = req.params.id;
    // Logic to assign driver
    res.send({ success: true });
  });
router.delete("/:id", DriveController.deleteDrive);

//export
module.exports = router;
