import React from "react";
import BeforNav from "./NavBar/BeforNav";
import "./home.css";
import Footer from "../../Footer/Footer";
function BeforHome() {
  return (
    <div>
      <BeforNav />

      <div className="bkimg">
        <div>
          <div className="dis_div">
            <div>
              {/* <h1 className="welcome_topic">Welcome ECO-R</h1> */}
              <div className="des">
                <p className="des1">
                  Welcome to ECO-R Waste Management! At ECO-R, we strive to
                  provide efficient waste management services. From this guest
                  dashboard, you can easily navigate to your specific user role.
                  Drivers can manage and fulfill waste collection requests with
                  ease. Customers can request services, track collections, and
                  view their history. Admins oversee operations, manage
                  accounts, and ensure smooth service delivery. Join us in our
                  mission for a cleaner, greener environment.
                </p>
              </div>
              <div className="welcm">
                <h1 className="welcome_topic">Welcome ECO-R</h1>
                <div className="buttongroups">
                <button
                  className="welcome_btns"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </button>
                <button
                    className="welcome_btns"
                    onClick={() => (window.location.href = "/userregister")}
                  >
                    Register
                  </button>                                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BeforHome;
