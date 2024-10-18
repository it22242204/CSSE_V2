const express=require("express");
const router=express.Router();

//Insert Model
const Order=require("../Model/Specialordermodel");
//Insert User Controller
const OrderController=require("../Controllers/Specialordercontroller");

router.get("/",OrderController.getAllOrders);
router.post("/",OrderController.addOrders);
router.get("/:id",OrderController.getById);
router.put("/:id",OrderController.updateOrder);
router.delete("/:id",OrderController.deleteOrder);
// New routes for driver assignment and notifications
router.put("/updateStatus/:id",OrderController.updateStatus);

module.exports=router
