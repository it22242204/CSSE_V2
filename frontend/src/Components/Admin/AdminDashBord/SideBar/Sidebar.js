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
                onClick={() => (window.location.href = "/admin")}
              >
                DashBoard
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/delivrydata")}
              >
                User Profile
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/employeedetails")}
              >
                Driver Profile
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/inventoryitemdetails")}
              >
                Special Collection
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/requesthandling")}
              >
               Request Handling
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/admin-allproducts")}
              >
               Products
              </p>
              <p
                className="nav_item"
<<<<<<< HEAD
                onClick={() => (window.location.href = "/eticketadmin")}
              >
               Etickets
=======
                onClick={() => (window.location.href = "/adminr")}
              >
                Recycle Service
>>>>>>> 147a2519bb4a0722c00dc5506df355aed7ea4b2f
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/userdetails")}
              >
                User
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="adminsmalnav">
        <h3>Admin Controller Panel</h3>
      </div>
    </div>
  );
};

export default Sidebar;
