const Vehical = require("../Model/DeliveryManegmentVehicalModel");

const getAllVehical = async (req, res, next) => {
  let vehi;
  // Get all Vehical
  try {
    vehi = await Vehical.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!vehi) {
    return res.status(404).json({ message: "Vehical not found" });
  }
  // Display all vehi
  return res.status(200).json({ vehi });
};

// data Insert
const addVehical = async (req, res, next) => {
  const { name, gmail, address, phone,numberplate } = req.body;

  let vehi;

  try {
    vehi = new Vehical({
      name,
      gmail,
      address,
      phone,
      numberplate
    });
    await vehi.save();
  } catch (err) {
    console.log(err);
  }
  // not insert vehis
  if (!vehi) {
    return res.status(404).json({ message: "unable to add Vehical" });
  }
  return res.status(200).json({ vehi });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let vehi;

  try {
    vehi = await Vehical.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available vehis
  if (!vehi) {
    return res.status(404).json({ message: "Vehical Not Found" });
  }
  return res.status(200).json({ vehi });
};

//Update vehi Details
const updateVehical = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, address, phone,numberplate } = req.body;

  let vehis;

  try {
    vehis = await Vehical.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      address: address,
      phone: phone,
      numberplate:numberplate,
    });
    vehis = await vehis.save();
  } catch (err) {
    console.log(err);
  }
  if (!vehis) {
    return res
      .status(404)
      .json({ message: "Unable to Update Vehical Details" });
  }
  return res.status(200).json({ vehis });
};

//Delete vehi Details
const deleteVehical = async (req, res, next) => {
  const id = req.params.id;

  let vehi;

  try {
    vehi = await Vehical.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!vehi) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Vehical Details" });
  }
  return res.status(200).json({ vehi });
};

exports.getAllVehical = getAllVehical;
exports.addVehical = addVehical;
exports.getById = getById;
exports.updateVehical = updateVehical;
exports.deleteVehical = deleteVehical;
