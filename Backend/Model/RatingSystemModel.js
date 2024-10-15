const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  imgurl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,   
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  }, 
  date: {
    type: String, 
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);