import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from "../../../Footer/Footer";
function AddDilivery() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    locatin: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Submit successfully!");
    navigate("/myorder");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:8080/deliveri", {
      name: inputs.name,
      gmail: inputs.gmail,
      phone: inputs.phone,
      locatin: inputs.locatin,
    });
  };
  return (
    <div>
      <AfterNav />
      <div className="">
        <h1 className="topic_mash_mart">
          Dilivery
          <span className="sub_topic_mash_mart"> Form</span>{" "}
        </h1>
        <div className="aditem_order">
          <button
            className="btn_dash_admin"
            onClick={() => (window.location.href = "/myorder")}
          >
            My Order
          </button>
        </div>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.name}
              onChange={handleChange}
              name="name"
            />
            <br></br>
            <label className="form_box_item_lable">gmail</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="email"
              value={inputs.gmail}
              onChange={handleChange}
              name="gmail"
              required
            />
            <br></br>
            <label className="form_box_item_lable">phone</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              pattern="[0-9]{10}" 
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              required
            />
            <br></br>
            <label className="form_box_item_lable">locatin</label>
            <br></br>
            <textarea
              className="form_box_item_input"
              type="text"
              value={inputs.locatin}
              onChange={handleChange}
              name="locatin"
              required
            />
            <br></br>
            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AddDilivery;
