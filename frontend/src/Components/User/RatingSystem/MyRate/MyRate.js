import React, { useState } from "react";
import axios from "axios";
import '../Rate/Rate.css'
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import AfterNav from "../../Home/NavBar/AfterNav";
function MyRate() {
  const [rates, setRate] = useState([]);
  const [email, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/rates?email=${email}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.rate.filter(
        (rate) => rate.email === email
      );

      setRate(relevantCard);

      if (relevantCard.length === 0) {
        alert("No  found,Plase enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  /*Delete Code */
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/rates/${_id}`);
        window.alert(" deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting Message details:", error);
      }
    }
  };
  return (
    <div>
        <AfterNav />
      <div className="form_box_rate">
        <form className="form_rate" onSubmit={handleSubmit}>
          <label className="form_lable_rate" htmlFor="email">
            Enter Your Gmail
          </label>
          <br></br>
          <input
            className="form_input_rate"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <br></br>
          <button className="centerbtn_rate" type="submit">
            Check
          </button>
        </form>
      </div>
      <div className="tbl_data">
        <table className="table_details_admin">
          <thead>
            <tr className="tble_card_details_tr">
              <th className="admin_tbl_th">img</th>
              <th className="admin_tbl_th">username</th>
              <th className="admin_tbl_th">Gmail</th>
              <th className="admin_tbl_th">Rating</th>
              <th className="admin_tbl_th">date</th>
              <th className="admin_tbl_th">comment</th>
              <th className="admin_tbl_th">Actions</th>
            </tr>
          </thead>
          {rates.map((rates, index) => (
            <tbody>
              <tr key={index}>
                <td className="admin_tbl_td">
                  <img src={rates.imgurl} alt="itemimg_rate" className="itemimg_rate" />
                </td>
                <td className="admin_tbl_td">{rates.username}</td>
                <td className="admin_tbl_td gmil">{rates.email}</td>
                <td className="admin_tbl_td">
                  <Rating
                    name="read-only"
                    value={parseFloat(rates.rating)} // Convert to number if necessary
                    precision={0.5} // Precision for half-star ratings
                    readOnly
                    icon={<StarIcon fontSize="inherit" />}
                  />
                </td>
                <td className="admin_tbl_td">{rates.date}</td>
                <td className="admin_tbl_td">{rates.comment}</td>
                <td className="admin_tbl_td">
                  <Link to={`/updaterate/${rates._id}`} className="update_rate">
                    Update
                  </Link>
                  <button
                    className="dlt_rate"
                    onClick={() => deleteHandler(rates._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default MyRate;
