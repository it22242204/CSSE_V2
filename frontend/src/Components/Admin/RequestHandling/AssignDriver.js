import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../AdminDashBord/SideBar/Sidebar";

const URL = "http://localhost:8080/drive";
const SMS_API_URL = "http://localhost:8080/send-sms"; // Example API for sending SMS

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AssignDriver() {
  const [driv, setDriver] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setDriver(data.driv));
  }, []);

  const history = useNavigate();

  // Function to handle assigning a driver
  const handleAssignDriver = async (driver) => {
    const confirmAssign = window.confirm(
      `Are you sure you want to assign ${driver.name} as the driver?`
    );

    if (confirmAssign) {
      try {
        setLoading(true);
        
        // Simulate assigning driver in the system
        await axios.put(`${URL}/${driver._id}/assign-driver`);
        
        // Notify the admin
        window.alert(`Driver ${driver.name} has been assigned successfully!`);

        // Send SMS to the driver
        const smsResponse = await axios.post(SMS_API_URL, {
          phoneNumber: driver.phone,
          message: "You have a new delivery assignment. Please check your dashboard for details."
        });

        if (smsResponse.status === 200) {
          window.alert(`SMS sent to ${driver.name}: ${driver.phone}`);
        } else {
          window.alert(`Failed to send SMS to ${driver.name}`);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error assigning the driver:", error);
        window.alert("An error occurred while assigning the driver.");
        setLoading(false);
      }
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Driver Details Report",
    onafterprint: () => alert("Driver Details Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.driv.filter((driv) =>
        Object.values(driv).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDriver(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <div className="dash_button_set">
          <tr>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              />
            </td>

            <td>
              <button onClick={handleSearch} className="btn_dash_admin">
                Search
              </button>
            </td>
          </tr>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Driver Account
            <span className="sub_topic_inventory"> Details</span>
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">Name</th>
                <th className="admin_tbl_th">Phone</th>
                <th className="admin_tbl_th">Address</th>
                <th className="admin_tbl_th">Email</th>
                <th className="admin_tbl_th">Action</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br />
                <h1 className="con_topic">
                  No <span className="clo_us">Results Found</span>
                </h1>
              </div>
            ) : (
              <tbody>
                {driv.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{item.name}</td>
                    <td className="admin_tbl_td">{item.phone}</td>
                    <td className="admin_tbl_td">{item.address}</td>
                    <td className="admin_tbl_td">{item.gmail}</td>
                    <td className="admin_tbl_td">
                      <button
                        onClick={() => handleAssignDriver(item)}
                        className="btn_dash_admin"
                        disabled={loading}
                      >
                        {loading ? "Assigning..." : "Assign Driver"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignDriver;
