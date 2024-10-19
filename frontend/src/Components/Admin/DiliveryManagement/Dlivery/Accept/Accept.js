import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Sidebar from "../../../AdminDashBord/SideBar/Sidebar";

function Accept() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/deliveri/${id}`
        );
        setInputs(response.data.deliveries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8081/deliveri/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        phone: String(inputs.phone),
        locatin: String(inputs.locatin),
        status: String(inputs.status),
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
      window.alert("Status Added successfully!");
      history("/delivrydata");
    });
  };
  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <h1 className="topic_mash_mart">
          Delivery
          <span className="sub_topic_mash_mart">Accept Form</span>{" "}
        </h1>

        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              readOnly
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
              readOnly
            />
            <br></br>
            <label className="form_box_item_lable">phone</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              readOnly
            />
            <br></br>
            <label className="form_box_item_lable">location</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.locatin}
              onChange={handleChange}
              name="locatin"
              readOnly
            />
            <br></br>
            <label className="form_box_item_lable">status</label>
            <br></br>
            <select
              className="form_box_item_input"
              value={inputs.status}
              onChange={handleChange}
              name="status"
              required
            >
              <option value="">Select Status</option>
              <option value="accept">Accept</option>
              <option value="on_the_way">On the way</option>
              <option value="compleate">Compleate</option>
            </select>

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

export default Accept;
