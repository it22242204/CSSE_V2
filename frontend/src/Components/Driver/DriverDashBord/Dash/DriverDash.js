import React from "react";
import "./driverdash.css";
import Sidebar from "../SideBar/Sidebar";
import Driverimg from "./img/DriverDashImage.jpg";
import'../../Driver.css';
function AdminDash() {
  return (
    <div>
      <Sidebar />
      <div>
        <div className="welcomebox_admin">
          <div className="welcome_sub_box_admin" >
            <img src={Driverimg} alt="adminimg" className="welcomeimg" />
            <br></br>
            <h1>Welcome Back Driver</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
