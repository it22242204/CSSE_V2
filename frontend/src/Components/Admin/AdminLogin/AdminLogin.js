import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logimg from "./img/adlog.webp";

function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if username and password match
    if (user.username === "admin" && user.password === "123") {
      alert('admin login successful')
      navigate("/admin");
    } else {
      // Show error message or handle invalid credentials
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <div className="auth_box">
        <div>
          <h1 className="login-topic">Admin Login Here..!</h1>
          <br></br>
          <div className="user_tabl_towcolum">
            <div className="left_colum_user">
              <img src={logimg} alt="regi img" className="regi_img" />
            </div>
            <div className="riight_colum_user">
              <form className="regi-form" onSubmit={handleSubmit}>
                <label className="login-lable">User Name</label>
                <br></br>
                <input
                  type="username"
                  className="login-input"
                  value={user.username}
                  onChange={handleInputChange}
                  name="username"
                  required
                ></input>
                <br></br>
                <label className="login-lable">Password</label>
                <br></br>
                <input
                  type="password"
                  className="login-input"
                  value={user.password}
                  name="password"
                  onChange={handleInputChange}
                  required
                ></input>
                <br></br>
                <button className="admin_form_cneter_btn" type="submit">
                  Login
                </button>
                <br></br>
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
