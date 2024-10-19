import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const AddProduct = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    location: "",
    price: "",
    code: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/products/", inputs);
      alert("Product added successfully.");
      navigate("/admin-allproducts");
    } catch (error) {
      console.error("Error submitting product:", error);
      setError("Error submitting product. Please try again.");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Add New
          <span className="sub_topic_mash_mart"> Product</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <div>
              <label className="form_box_item_lable">Name:</label>
              <input
                className="form_box_item_input"
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form_box_item_lable">Image URL:</label>
              <input
                className="form_box_item_input"
                type="text"
                name="image"
                value={inputs.image}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form_box_item_lable">Specifications:</label>
              <input
                className="form_box_item_input"
                type="text"
                name="location"
                value={inputs.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form_box_item_lable">Price:</label>
              <input
                className="form_box_item_input"
                type="number"
                name="price"
                min="1"
                value={inputs.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form_box_item_lable">price per Kg:</label>
              <input
                className="form_box_item_input"
                type="text"
                name="code"
                value={inputs.code}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="product-error-message">{error}</p>}
            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
