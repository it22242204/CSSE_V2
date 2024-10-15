const Inform = require("../Model/informSupplyModel");

const getAllInform = async (req, res, next) => {
  let info;
  // Get all Inform
  try {
    info = await Inform.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!info) {
    return res.status(404).json({ message: "Inform not found" });
  }
  // Display all info
  return res.status(200).json({ info });
};

// data Insert
const addInform = async (req, res, next) => {
  const { itemname, quantity, price, description } = req.body;

  let info;

  try {
    info = new Inform({
      itemname,
      quantity,
      price,
      description,
    });
    await info.save();
  } catch (err) {
    console.log(err);
  }
  // not insert infos
  if (!info) {
    return res.status(404).json({ message: "unable to add Inform" });
  }
  return res.status(200).json({ info });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let info;

  try {
    info = await Inform.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available infos
  if (!info) {
    return res.status(404).json({ message: "Inform Not Found" });
  }
  return res.status(200).json({ info });
};

//Update info Details
const updateInform = async (req, res, next) => {
  const id = req.params.id;
  const { itemname, quantity, price, description } = req.body;

  let infos;

  try {
    infos = await Inform.findByIdAndUpdate(id, {
      itemname: itemname,
      quantity: quantity,
      price: price,
      description: description,
    });
    infos = await infos.save();
  } catch (err) {
    console.log(err);
  }
  if (!infos) {
    return res
      .status(404)
      .json({ message: "Unable to Update Inform Details" });
  }
  return res.status(200).json({ infos });
};

//Delete info Details
const deleteInform = async (req, res, next) => {
  const id = req.params.id;

  let info;

  try {
    info = await Inform.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!info) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Inform Details" });
  }
  return res.status(200).json({ info });
};

exports.getAllInform = getAllInform;
exports.addInform = addInform;
exports.getById = getById;
exports.updateInform = updateInform;
exports.deleteInform = deleteInform;
