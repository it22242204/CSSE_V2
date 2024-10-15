const express = require("express");
const router = express.Router();
//Insert Controller
const InformController = require("../Controllers/informSupplyController");

router.get("/", InformController.getAllInform);
router.post("/", InformController.addInform);
router.get("/:id", InformController.getById);
router.put("/:id", InformController.updateInform);
router.delete("/:id", InformController.deleteInform);

//export
module.exports = router;
