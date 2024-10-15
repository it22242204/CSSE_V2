const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  numberplate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vehical", VehicalSchema);