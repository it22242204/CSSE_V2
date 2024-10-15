const Inventory = require("../Model/InventroyManegmentModel");

const getAllInventory = async (req, res, next) => {
  let invent;
  // Get all Inventory
  try {
    invent = await Inventory.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!invent) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  // Display all invent
  return res.status(200).json({ invent });
};

// data Insert
const addInventory = async (req, res, next) => {
  const { itemname, quantity, price, description } = req.body;

  let invent;

  try {
    invent = new Inventory({
      itemname,
      quantity,
      price,
      description,
    });
    await invent.save();
  } catch (err) {
    console.log(err);
  }
  // not insert invents
  if (!invent) {
    return res.status(404).json({ message: "unable to add Inventory" });
  }
  return res.status(200).json({ invent });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let invent;

  try {
    invent = await Inventory.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available invents
  if (!invent) {
    return res.status(404).json({ message: "Inventory Not Found" });
  }
  return res.status(200).json({ invent });
};

//Update invent Details
const updateInventory = async (req, res, next) => {
  const id = req.params.id;
  const { itemname, quantity, price, description } = req.body;

  let invents;

  try {
    invents = await Inventory.findByIdAndUpdate(id, {
      itemname: itemname,
      quantity: quantity,
      price: price,
      description: description,
    });
    invents = await invents.save();
  } catch (err) {
    console.log(err);
  }
  if (!invents) {
    return res
      .status(404)
      .json({ message: "Unable to Update Inventory Details" });
  }
  return res.status(200).json({ invents });
};

//Delete invent Details
const deleteInventory = async (req, res, next) => {
  const id = req.params.id;

  let invent;

  try {
    invent = await Inventory.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!invent) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Inventory Details" });
  }
  return res.status(200).json({ invent });
};

exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
