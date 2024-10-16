import React from "react";
import "./sidebar.css";
import Logo from "./img/recycle.png";
const Sidebar = ({ children }) => {
  return (
    <div>
      <div className="container_nav">
        <div style={{ width: "200px" }} className="sidebar">
          <div className="nav_item_main">
            <div>
              <div>
                <img src={Logo} alt="logo" className="nav_logo" />
              </div>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/DriverDash")}
              >
                DashBoard
              </p>
      
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/Notifications")}
              >
                Notifications
              </p>

              <p
                className="nav_item"
                onClick={() => (window.location.href = "/driverdelivrydata")}
              >
                Delivery Details
              </p>

              <p
                className="nav_item"
                onClick={() => (window.location.href = "/DriversDetails")}
              >
                Profiles
              </p>

              {/* <p
                className="nav_item"
                onClick={() => (window.location.href = "/admin-allproducts")}
              >
               Request Handling
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/supplierdetails")}
              >
                Recycle Division
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/userdetails")}
              >
                Profile
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="adminsmalnav">
        <h3>Driver Controller Panel</h3>
      </div>
    </div>
  );
};

export default Sidebar;
