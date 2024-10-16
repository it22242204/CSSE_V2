import React, { useState } from "react";
import axios from "axios";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from "../../../Footer/Footer";

function MyOrder() {
  const [delivery, setDlivery] = useState([]);

  const [gmail, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/deliveri?gmail=${gmail}`
      );
      console.log("Response:", response.data);

      if (response.data.deliveries && response.data.deliveries.length > 0) {
        const relevantDeliveries = response.data.deliveries.filter(
          (delivery) => delivery.gmail === gmail
        );
        setDlivery(relevantDeliveries);

        if (relevantDeliveries.length === 0) {
          alert("No data found for the provided Gmail address");
        }
      } else {
        alert("No data found for the provided Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
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
            id="gmail"
            name="gmail"
            value={gmail}
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
              <th className="admin_tbl_th">name</th>
              <th className="admin_tbl_th">gmail</th>
              <th className="admin_tbl_th">phone</th>
              <th className="admin_tbl_th">location</th>
              <th className="admin_tbl_th">status</th>
            </tr>
          </thead>
          {delivery.map((delivery, index) => (
            <tbody>
              <tr key={index}>
                <td className="admin_tbl_td">{delivery.name}</td>
                <td className="admin_tbl_td gmil">{delivery.gmail}</td>
                <td className="admin_tbl_td">{delivery.phone}</td>
                <td className="admin_tbl_td">{delivery.locatin}</td>
                <td className="admin_tbl_td">
                  {delivery.status || "Not yet accepted"}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <Footer/>
    </div>
  );
}

export default MyOrder;
