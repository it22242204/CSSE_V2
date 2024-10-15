const express = require("express");
const router = express.Router();

//Insert User Controller
const UserProfileController = require("../Controllers/UserProfileControlers");

router.post("/", UserProfileController.getProfile);
//export
module.exports = router;
  