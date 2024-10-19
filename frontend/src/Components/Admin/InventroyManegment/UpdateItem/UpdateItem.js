import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

function UpdateItem() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/inventory/${id}`
        );
        setInputs(response.data.invent);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8081/inventory/${id}`, {
        itemname: String(inputs.itemname),
        quantity: String(inputs.quantity),
        price: String(inputs.price),
        description: String(inputs.description),
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
      window.alert("Item Details Update successfully!");
      history("/inventoryitemdetails");
    });
  };
  return (
    <div>
      <Sidebar/>
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Update Item
          <span className="sub_topic_mash_mart"> Details</span>{" "}
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;
