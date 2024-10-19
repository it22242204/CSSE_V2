import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Driver.css"; 
import Sidebar from "../DriverDashBord/SideBar/Sidebar";


function DriverProfile() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    async function fetchDriverDetails() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post("http://localhost:8080/drive", {
          token: token,
        });
        if (response.data.status === "ok") {
          setDriver(response.data.driver); // Update driver state with received data
          localStorage.setItem("driverEmail", response.data.driver.gmail); // Store gmail in localStorage
          localStorage.setItem("driverAddress", response.data.driver.address); // Store address in localStorage
        } else {
          console.error("Error retrieving driver details:", response.data.data);
        }
      } catch (error) {
        console.error("Error retrieving driver details:", error.message);
      } finally {
        setLoading(false); // Update loading state regardless of success or error
      }
    }

    fetchDriverDetails();
  }, []);

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete account?"
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/drive/${driver._id}`);
        window.alert("Driver account details deleted successfully!");
        history("/");
        window.location.reload(); // Reload the page
      } catch (error) {
        console.error("Error deleting driver account details:", error);
      }
    }
  };

  return (
    <div>
        <Sidebar/>
      <br></br> <br></br>
      <div>
        <h1 className="login-topic">Welcome Back {driver ? driver.name : ""} </h1>
        <br></br>
        <div className="driver_profile">
          <div>
            {loading ? (
              <p>Loading driver details...</p>
            ) : driver ? (
              <div>
                <div>
                  <h3 className="profile_item">Name : {driver.name}</h3>
                  <h3 className="profile_item">Gmail : {driver.gmail}</h3>
                  <h3 className="profile_item">Address : {driver.address}</h3>
                  <h3 className="profile_item">Phone : {driver.phone}</h3>
                </div>
              </div>
            ) : (
              <p>Driver data not found.</p>
            )}
            <div className="btn_con">
              {driver && (
                <Link
                  className="btn_dash_admin"
                  to={`/updatedriver/${driver._id}`}
                >
                  Update
                </Link>
              )}
              <button onClick={deleteHandler} className="btn_dash_admin_dlt">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
