import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

function UpdateSupplier() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/supplier/${id}`
        );
        setInputs(response.data.supply);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8081/supplier/${id}`, {
        firstname: String(inputs.firstname),
        lastname: String(inputs.lastname),
        phone: String(inputs.phone),
        address: String(inputs.address),
        gmail: String(inputs.gmail),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Account Update successfully!");
      history("/supplierdetails");
    });
  };
  return (
    <div>
      <Sidebar/>
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Update Account
          <span className="sub_topic_mash_mart"> Details</span>{" "}
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateSupplier;
