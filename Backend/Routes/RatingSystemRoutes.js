const express = require("express");
const router = express.Router();
//Insert Controller
const RatingController = require("../Controllers/RatingSystemControllers");

router.get("/", RatingController.getAllRating);
router.post("/", RatingController.addRating);
router.get("/:id", RatingController.getById);
router.put("/:id", RatingController.updateRating);
router.delete("/:id", RatingController.deleteRating);

//export
module.exports = router;
