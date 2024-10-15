const Drive = require("../Model/DeliveryManegmentDriveModel");

const getAllDrive = async (req, res, next) => {
  let driv;
  // Get all Drive
  try {
    driv = await Drive.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!driv) {
    return res.status(404).json({ message: "Drive not found" });
  }
  // Display all driv
  return res.status(200).json({ driv });
};

// data Insert
const addDrive = async (req, res, next) => {
  const { name, gmail, address, phone } = req.body;

  let driv;

  try {
    driv = new Drive({
      name,
      gmail,
      address,
      phone,
    });
    await driv.save();
  } catch (err) {
    console.log(err);
  }
  // not insert drivs
  if (!driv) {
    return res.status(404).json({ message: "unable to add Drive" });
  }
  return res.status(200).json({ driv });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let driv;

  try {
    driv = await Drive.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available drivs
  if (!driv) {
    return res.status(404).json({ message: "Drive Not Found" });
  }
  return res.status(200).json({ driv });
};

//Update driv Details
const updateDrive = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, address, phone } = req.body;

  let drivs;

  try {
    drivs = await Drive.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      address: address,
      phone: phone,
    });
    drivs = await drivs.save();
  } catch (err) {
    console.log(err);
  }
  if (!drivs) {
    return res
      .status(404)
      .json({ message: "Unable to Update Drive Details" });
  }
  return res.status(200).json({ drivs });
};

//Delete driv Details
const deleteDrive = async (req, res, next) => {
  const id = req.params.id;

  let driv;

  try {
    driv = await Drive.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!driv) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Drive Details" });
  }
  return res.status(200).json({ driv });
};

exports.getAllDrive = getAllDrive;
exports.addDrive = addDrive;
exports.getById = getById;
exports.updateDrive = updateDrive;
exports.deleteDrive = deleteDrive;
