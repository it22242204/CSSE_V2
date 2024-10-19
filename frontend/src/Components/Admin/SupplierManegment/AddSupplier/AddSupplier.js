import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

function AddSupplier() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    gmail: "",
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
    window.alert("Account Create successfully!");
    navigate("/supplierdetails");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:8080/supplier", {
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      phone: inputs.phone,
      address: inputs.address,
      gmail: inputs.gmail,
    });
  };
  return (
    <div>
      <Sidebar/>
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Creat Account For
          <span className="sub_topic_mash_mart"> Supplier</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">first name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.firstname}
              onChange={handleChange}
              name="firstname"
            />
            <br></br>
            <label className="form_box_item_lable">lastname</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.lastname}
              onChange={handleChange}
              name="lastname"
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
            <label className="form_box_item_lable">address</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.address}
              onChange={handleChange}
              name="address"
              required
            />
            <br></br>
            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSupplier;
