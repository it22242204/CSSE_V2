import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

function InformSupply() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    itemname: "",
    quantity: "",
    price: "",
    description: "",
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
    window.alert("Request Send successfully!");
    navigate("/inventoryitelowstock");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:8081/inform", {
      itemname: inputs.itemname,
      quantity: inputs.quantity,
      price: inputs.price,
      description: inputs.description,
    });
  };
  return (
    <div>
      <div>
        <Sidebar />
        <div className="children_div_admin">
          <h1 className="topic_mash_mart">
              Infrom Supply
            <span className="sub_topic_mash_mart"> </span>{" "}
          </h1>
          <div className="item_full_box">
            <form className="item_form_admin" onSubmit={handleSubmit}>
              <label className="form_box_item_lable">itemname</label>
              <br></br>
              <input
                className="form_box_item_input"
                type="text"
                required
                value={inputs.itemname}
                onChange={handleChange}
                name="itemname"
              />
              <br></br>
              <label className="form_box_item_lable">quantity</label>
              <br></br>
              <input
                className="form_box_item_input"
                type="number"
                value={inputs.quantity}
                onChange={handleChange}
                name="quantity"
                min="1"
                required
              />
              <br></br>
              <label className="form_box_item_lable">price</label>
              <br></br>
              <input
                className="form_box_item_input"
                type="number"
                value={inputs.price}
                onChange={handleChange}
                name="price"
                min="0"
                required
              />
              <br></br>
              <label className="form_box_item_lable">description</label>
              <br></br>
              <textarea
                className="form_box_item_input"
                type="text"
                value={inputs.description}
                onChange={handleChange}
                name="description"
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
    </div>
  );
}

export default InformSupply;
