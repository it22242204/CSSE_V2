import React from "react";
import "./sidebar.css";
import Logo from "./img/logo.jpg";
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
                Delivery
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/employeedetails")}
              >
                Employee
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/inventoryitemdetails")}
              >
                Inventory
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/admin-allproducts")}
              >
                Product
              </p>
              <p
                className="nav_item"
                onClick={() => (window.location.href = "/supplierdetails")}
              >
                Supplier
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
