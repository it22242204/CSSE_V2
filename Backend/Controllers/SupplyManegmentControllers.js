const Supplier = require("../Model/SupplyManegmentModel");

const getAllSupplier = async (req, res, next) => {
  let supply;
  // Get all Supplier
  try {
    supply = await Supplier.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!supply) {
    return res.status(404).json({ message: "Supplier not found" });
  }
  // Display all supply
  return res.status(200).json({ supply });
};

// data Insert
const addSupplier = async (req, res, next) => {
  const { firstname, lastname, phone, address, gmail } = req.body;

  let supply;

  try {
    supply = new Supplier({
      firstname,
      lastname,
      phone,
      address,
      gmail,
    });
    await supply.save();
  } catch (err) {
    console.log(err);
  }
  // not insert supplys
  if (!supply) {
    return res.status(404).json({ message: "unable to add Supplier" });
  }
  return res.status(200).json({ supply });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let supply;

  try {
    supply = await Supplier.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available supplys
  if (!supply) {
    return res.status(404).json({ message: "Supplier Not Found" });
  }
  return res.status(200).json({ supply });
};

//Update supply Details
const updateSupplier = async (req, res, next) => {
  const id = req.params.id;
  const { firstname, lastname, phone, address, gmail } = req.body;

  let supplys;

  try {
    supplys = await Supplier.findByIdAndUpdate(id, {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        gmail: gmail,
    });
    supplys = await supplys.save();
  } catch (err) {
    console.log(err);
  }
  if (!supplys) {
    return res
      .status(404)
      .json({ message: "Unable to Update Supplier Details" });
  }
  return res.status(200).json({ supplys });
};

//Delete supply Details
const deleteSupplier = async (req, res, next) => {
  const id = req.params.id;

  let supply;

  try {
    supply = await Supplier.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!supply) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Supplier Details" });
  }
  return res.status(200).json({ supply });
};

exports.getAllSupplier = getAllSupplier;
exports.addSupplier = addSupplier;
exports.getById = getById;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;
