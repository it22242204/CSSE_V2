import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./AddRate.css";
import AfterNav from "../../Home/NavBar/AfterNav";
function AddRate() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    imgurl:"",
    username: "",
    email: "",
    rating: null,
    date: "",
    comment: "",
  });

  const handleChange = (event, newValue) => {
    setInputs((prevState) => ({
      ...prevState,
      rating: newValue,
    }));
  };

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.imgurl ||
      !inputs.username ||
      !inputs.email ||
      !inputs.rating ||
      !inputs.date ||
      !inputs.comment
    ) {
      alert("Please provide all required information.");
      return;
    }
    console.log(inputs);
    await sendRequest();
    showAlert();
    navigate("/ratedetails");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/rates", {
      imgurl: inputs.imgurl,
      username: inputs.username,
      email: inputs.email,
      rating: inputs.rating,
      date: inputs.date,
      comment: inputs.comment,
    });
  };

  const showAlert = () => {
    alert("Rate added successfully!");
  };

  return (
    <div>
        <AfterNav />
      <div>
        <div className="rate-full-box">
          <div className="">
            <h1 className="rate_topic">
              Add <span className="rate-us">Feedback</span>{" "}
            </h1>
            <form onSubmit={handleSubmit} className="rate-full-box-form">
            <label className="rate-full-box-label">img url</label>
              <br></br>
              <input
                type="text"
                name="imgurl"
                value={inputs.imgurl}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Item Name</label>
              <br></br>
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Email</label>
              <br></br>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Rating</label>
              <br></br>
              <Rating
                name="rating"
                size="large"
                value={inputs.rating}
                onChange={handleChange}
                precision={1}
                icon={<StarIcon fontSize="inherit" />}
                required
              />
              <br />
              <label className="rate-full-box-label">date</label>
              <br></br>
              <input
                type="date"
                name="date"
                value={inputs.date}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Comment</label>
              <br></br>
              <textarea
                className="rate-full-box-input rate-text"
                name="comment"
                value={inputs.comment}
                onChange={handleCommentChange}
                required
              />
              <br />
              <button type="submit" className="centerbtn_rate">
                Add Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRate;
