const RegularCollection = require('../Model/RegularCollectionModel');

const getAllRegularCollection = async (req, res, next) => {
  let regularCollections;
  try {
    regularCollections = await RegularCollection.find();
  } catch (err) {
    console.log(err);
  }
  if (!regularCollections) {
    return res.status(404).json({ message: "RegularCollection not found" });
  }
  return res.status(200).json({ regularCollections });
};
// Add Regular Collection
const addRegularCollection = async (req, res, next) => {
  const { TypeofUser, Name, PhoneNumber, Address, ColletionOption, Amount } = req.body;

  let regularCollection;

  try {
    regularCollection = new RegularCollection({
      TypeofUser,
      Name,
      PhoneNumber,
      Address,
      ColletionOption,
      Amount,
    });
    await regularCollection.save();
  } catch (err) {
    console.log(err);
  }
  if (!regularCollection) {
    return res.status(404).json({ message: "unable to add RegularCollection" });
  }
  return res.status(200).json({ regularCollection });
};
// Retrieve Regular Collection
const getById = async (req, res, next) => {
  const id = req.params.id;

  let regularCollection;

  try {
    regularCollection = await RegularCollection.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!regularCollection) {
    return res.status(404).json({ message: "RegularCollection Not Found" });
  }
  return res.status(200).json({ regularCollection });
};

// Update Regular Collection
const updateRegularCollection = async (req, res, next) => {
  const id = req.params.id;
  const { TypeofUser, Name, PhoneNumber, Address, ColletionOption, Amount } = req.body;

  let regularCollection;

  try {
    regularCollection = await RegularCollection.findByIdAndUpdate(id, {
      TypeofUser,
      Name,
      PhoneNumber,
      Address,
      ColletionOption,
      Amount,
    }, { new: true });
    regularCollection = await regularCollection.save();
  } catch (err) {
    console.log(err);
  }
  if (!regularCollection) {
    return res.status(404).json({ message: "Unable to Update RegularCollection Details" });
  }
  return res.status(200).json({ regularCollection });
};

// Delete Regular Collection
const deleteRegularCollection = async (req, res, next) => {
  const id = req.params.id;

  let regularCollection;

  try {
    regularCollection = await RegularCollection.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!regularCollection) {
    return res.status(404).json({ message: "Unable to Delete RegularCollection Details" });
  }
  return res.status(200).json({ regularCollection });
};

exports.getAllRegularCollection = getAllRegularCollection;
exports.addRegularCollection = addRegularCollection;
exports.getById = getById;
exports.updateRegularCollection = updateRegularCollection;
exports.deleteRegularCollection = deleteRegularCollection;