import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Sidebar from "../../../AdminDashBord/SideBar/Sidebar";

function AddVehical() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    phone: "",
    address: "",
    numberplate:"",
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
    window.alert("Vehical Added successfully!");
    navigate("/vehicaldetails");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:8081/vehical", {
      name: inputs.name,
      gmail: inputs.gmail,
      phone: inputs.phone,
      address: inputs.address,
      numberplate:inputs.numberplate,
    });
  };
  return (
    <div>
      <Sidebar/>
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Add New 
          <span className="sub_topic_mash_mart"> Vehicle</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">Vehicle name</label>
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
            <label className="form_box_item_lable">owener gmail</label>
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
            <label className="form_box_item_lable"> owener phone</label>
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
            <label className="form_box_item_lable">owener address</label>
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
            <label className="form_box_item_lable">number plate</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.numberplate}
              onChange={handleChange}
              name="numberplate"
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

export default AddVehical;
