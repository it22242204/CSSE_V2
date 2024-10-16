import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logimg from "./img/driver.jpg";

function DriverLogin() {
  const navigate = useNavigate();
  const [driver, setDriver] = useState({
    email: "",
    phone: ""
  });

  const handleInputChange = (event) => {
    setDriver({
      ...driver,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/drive", {
        gmail: driver.email,
        phone: driver.phone
      });

      if (response.status === 200) {
        alert('Driver login successful!');
        navigate("/DriverDash"); // Redirect to driver dashboard or another page
      }
    } catch (error) {
      console.error(error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <div className="auth_box">
        <div>
          <h1 className="login-topic">Driver Login Here..!</h1>
          <br />
          <div className="user_tabl_towcolum">
            <div className="left_colum_user">
              <img src={logimg} alt="Driver Login" className="regi_img" />
            </div>
            <div className="riight_colum_user">
              <form className="regi-form" onSubmit={handleSubmit}>
                <label className="login-lable">Email</label>
                <br />
                <input
                  type="email"
                  className="login-input"
                  value={driver.email}
                  onChange={handleInputChange}
                  name="email"
                  required
                />
                <br />
                <label className="login-lable">Password</label>
                <br />
                <input
                  type="password"
                  className="login-input"
                  value={driver.phone}
                  name="phone"
                  onChange={handleInputChange}
                  required
                />
                <br />
                <button className="admin_form_cneter_btn" type="submit">
                  Login
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverLogin;
