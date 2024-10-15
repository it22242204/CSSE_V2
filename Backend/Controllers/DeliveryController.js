const Delivery = require("../Model/DeliveryModel");

const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ message: "No deliveries found" });
    }
    return res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDeliveryById = async (req, res, next) => {
  const id = req.params.id;

  let deliveries;

  try {
    deliveries = await Delivery.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available drivs
  if (!deliveries) {
    return res.status(404).json({ message: "Drive Not Found" });
  }
  return res.status(200).json({ deliveries });
};

const addDelivery = async (req, res, next) => {
  const { name, gmail, phone, locatin,status } = req.body;
  try {
    const newDelivery = new Delivery({
      name,
      gmail,
      phone,
      locatin,
      status
    });
    await newDelivery.save();
    return res.status(201).json({ delivery: newDelivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add delivery" });
  }
};

const updateDelivery = async (req, res, next) => {
  const id = req.params.id;
  const { name, gmail, phone, locatin,status } = req.body;

  let deliveries;

  try {
    deliveries = await Delivery.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      locatin: locatin,
      phone: phone,
      status:status,
    });
    deliveries = await deliveries.save();
  } catch (err) {
    console.log(err);
  }
  if (!deliveries) {
    return res
      .status(404)
      .json({ message: "Unable to Update Drive Details" });
  }
  return res.status(200).json({ deliveries });
};

const deleteDelivery = async (req, res, next) => {
  const id = req.params.id;

  try {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) {
      return res.status(404).json({ message: "Unable to delete delivery details" });
    }
    return res.status(200).json({ delivery });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDeliveries,
  getDeliveryById,
  addDelivery,
  updateDelivery,
  deleteDelivery,
};
