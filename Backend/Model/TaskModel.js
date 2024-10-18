const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    customername: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    topic: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    responce: {
      type: String,
      default: "Not Yet",
    },
    ticketstatus: {
      type: String,
      default: "Delivered",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
