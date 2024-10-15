const express = require("express");
const router = express.Router();
//Insert Controller
const EmployeeController = require("../Controllers/EmployeManegmentControllers");

router.get("/", EmployeeController.getAllEmployee);
router.post("/", EmployeeController.addEmployee);
router.get("/:id", EmployeeController.getById);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

//export
module.exports = router;
