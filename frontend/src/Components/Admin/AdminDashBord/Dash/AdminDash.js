import React from "react";
import "./admindash.css";
import Sidebar from "../SideBar/Sidebar";
import Adminimg from "./img/adminhome.png";
import'../../Admin.css'
function AdminDash() {
  return (
    <div>
      <Sidebar />
      <div>
        <div className="welcomebox_admin">
          <div className="welcome_sub_box_admin" >
            <img src={Adminimg} alt="adminimg" className="welcomeimg" />
            <br></br>
            <h1>Welcome Back Admin</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
