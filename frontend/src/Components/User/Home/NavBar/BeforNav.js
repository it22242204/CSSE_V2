import React from "react";
import Logo from "../img/recycle-log.png";
import "./nav.css";
function BeforNav() {
  // const notcompleate = () => {
  //   alert("This Page Under Construction");
  // };
  return (
    <div>
      <div className="nav_bar">
        <div>
          <img src={Logo} alt="logo_nav" className="nav_logo_user" />
        </div>
        <div className="nav_item_user">
          <h3 className="navitem" onClick={() => (window.location.href = "/")}>Home</h3>
          <h3 className="navitem" onClick={() => (window.location.href = "/aboutus")}>About</h3>
          <h3 className="navitem" onClick={() => (window.location.href = "/Eticket")}>Contact Us</h3>
          <button
            className="nav_btn_log"
            onClick={() => (window.location.href = "/adminlogin")}
          >
            Admin
          </button>
          <button
            className="nav_btn_regi"
            onClick={() => (window.location.href = "/driverlogin")}
          >
            Driver
          </button>

        </div>
      </div>
    </div>
  );
}

export default BeforNav;
