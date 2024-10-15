const Rating = require("../Model/RatingSystemModel");

const getAllRating = async (req, res, next) => {
  let rate;
  // Get all Rating
  try {
    rate = await Rating.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!rate) {
    return res.status(404).json({ message: "Rating not found" });
  }
  // Display all rate
  return res.status(200).json({ rate });
};

// data Insert
const addRating = async (req, res, next) => {
  const { imgurl, username, email, rating, date, comment } = req.body;

  let rate;

  try {
    rate = new Rating({
      imgurl,
      username,
      email,
      rating,
      date,
      comment,
    });
    await rate.save();
  } catch (err) {
    console.log(err);
  }
  // not insert rates
  if (!rate) {
    return res.status(404).json({ message: "unable to add Rating" });
  }
  return res.status(200).json({ rate });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let rate;

  try {
    rate = await Rating.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available rates
  if (!rate) {
    return res.status(404).json({ message: "Rating Not Found" });
  }
  return res.status(200).json({ rate });
};

//Update rate Details
const updateRating = async (req, res, next) => {
  const id = req.params.id;
  const { imgurl, username, email, rating, date, comment } = req.body;

  let rates;

  try {
    rates = await Rating.findByIdAndUpdate(id, {
      imgurl: imgurl,
      username: username,
      email: email,
      rating: rating,
      date: date,
      comment: comment,
    });
    rates = await rates.save();
  } catch (err) {
    console.log(err);
  }
  if (!rates) {
    return res.status(404).json({ message: "Unable to Update Rating Details" });
  }
  return res.status(200).json({ rates });
};

//Delete rate Details
const deleteRating = async (req, res, next) => {
  const id = req.params.id;

  let rate;

  try {
    rate = await Rating.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!rate) {
    return res.status(404).json({ message: "Unable to Delete Rating Details" });
  }
  return res.status(200).json({ rate });
};

exports.getAllRating = getAllRating;
exports.addRating = addRating;
exports.getById = getById;
exports.updateRating = updateRating;
exports.deleteRating = deleteRating;
