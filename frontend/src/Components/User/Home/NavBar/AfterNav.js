import React from "react";
import Logo from "../img/recycle-log.png";
import "./nav.css";
import { FaShoppingCart } from "react-icons/fa";
function AfterNav() {
  return (
    <div>
      <div className="nav_bar">
        <div className="nav_con_user">
          <div>
            <img src={Logo} alt="logo_nav" className="nav_logo_user" />
          </div>
          <div className="nav_item_user">
            <h3
              className="navitem"
              onClick={() => (window.location.href = "/afetrhome")}
            >
              Home
            </h3>
            <h3
              className="navitem"
              onClick={() => (window.location.href = "/viewall")}
            >
              Request
            </h3>
            <h3
              className="navitem"
              onClick={() => (window.location.href = "/ratedetails")}
            >
              Special Collection
            </h3>
            <h3
              className="navitem"
              onClick={() => (window.location.href = "/viewall")}
            >
              Recycle Product
            </h3>
            <h3
              className="navitem"
              onClick={() => (window.location.href = "/ratedetails")}
            >
              Recycle Service
            </h3>
            <FaShoppingCart
              className="cart_icon"
              onClick={() => (window.location.href = "/view-cart")}
            />
            <button
              className="nav_btn_log"
              onClick={() => (window.location.href = "/userprofile")}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterNav;
