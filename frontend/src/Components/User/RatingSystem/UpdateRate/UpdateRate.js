import React, { useEffect, useState } from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Rating from "@mui/material/Rating";
import AfterNav from "../../Home/NavBar/AfterNav";

function UpdateRate() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rates/${id}`);
        const rateData = response.data.rate;
        setInputs({
          ...rateData, // Spread the rateData object to set all fields
          rating: rateData.rating ? parseFloat(rateData.rating) : 0, // Set a default value if rating is empty
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8080/rates/${id}`, {
        imgurl: String(inputs.imgurl),
        username: String(inputs.username),
        email: String(inputs.email),
        rating: String(inputs.rating),
        date: String(inputs.date),
        comment: String(inputs.comment),
      });
      window.alert("Update successfully!");
      history("/ratedetails");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "rating" ? parseFloat(value) : value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div>
      <AfterNav />
      <div className="rate-full-box">
        <div>
          <h1 className="rate_topic">
            Update <span className="rate-us">Rate</span>
          </h1>
          <form onSubmit={handleSubmit} className="rate-full-box-form">
            <label className="rate-full-box-label">img url</label>
            <input
              type="text"
              name="imgurl"
              value={inputs.imgurl}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Username</label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Rating</label>
            <br />
            <Rating
              name="rating"
              size="large"
              value={parseFloat(inputs.rating)} // Ensure rating is parsed as float
              onChange={handleChange} // Handle change event to update rating
              precision={0.5} // Adjust precision as needed
              icon={<StarIcon fontSize="inherit" />}
              required
            />
            <br />
            <label className="rate-full-box-label">date</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Comment</label>
            <textarea
              className="rate-full-box-input rate-text"
              name="comment"
              value={inputs.comment}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit" className="centerbtn_rate">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRate;
