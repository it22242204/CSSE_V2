import React from "react";
import Logo from "../img/recycle-log.png";
import "./navbarStyles.css";
import { FaShoppingCart } from "react-icons/fa";

function AfterNav() {
  return (
    <div>
      <div className="navbar">
        <div className="navbar__container">
          <div>
            <img src={Logo} alt="logo" className="navbar__logo" />
          </div>
          <div className="navbar__items">
            <h3
              className="navbar__item"
              onClick={() => (window.location.href = "/afetrhome")}
            >
              Home
            </h3>
            <h3
              className="navbar__item"
              onClick={() => (window.location.href = "/request")}
            >
              Request
            </h3>
            <h3
              className="navbar__item"
              onClick={() => (window.location.href = "/addspecialorder")}
            >
              Special Collection
            </h3>
            <h3
              className="navbar__item"
              onClick={() => (window.location.href = "/viewall")}
            >
              Recycle Products
            </h3>
            <h3
              className="navbar__item"
              onClick={() => (window.location.href = "/waste")}
            >
              Recycle Services
            </h3>
            <h3
              className="navbar__item"
              onClick={() => (window.location.href = "/myorder")}
            >
              Orders
            </h3>
            <FaShoppingCart
              className="navbar__cart-icon"
              onClick={() => (window.location.href = "/view-cart")}
            />
            <button
              className="navbar__profile-btn"
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
