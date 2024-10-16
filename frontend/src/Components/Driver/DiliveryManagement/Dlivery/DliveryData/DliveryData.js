import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../../../DriverDashBord/SideBar/Sidebar";

const URL = "http://localhost:8080/deliveri";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DliveryData() {
  //fetch data
  const [deliveries, setDelivery] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setDelivery(data.deliveries));
  }, []);

  /*Delete Function */
  const history = useNavigate();
  const deleteHandler = async (_id) => {
    // Define _id as a parameter
    const confirmed = window.confirm(
      "Are you sure you want to delete this Delivery Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`); // Correct URL construction
        window.alert("deleted successfully!");
        history("/driverdelivrydata");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting details:", error);
      }
    }
  };
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.deliveries.filter((deliveries) =>
        Object.values(deliveries).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDelivery(filtered);
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
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="btn_dash_admin">
                Search
              </button>
            </td>
          </tr>
          <div>
            {/* <button
              className="btn_dash_admin"
              onClick={() => (window.location.href = "/driverdetails")}
            >
              Driver
            </button> */}
            {/* <button
              className="btn_dash_admin gsp"
              onClick={() => (window.location.href = "/vehicaldetails")}
            >
              Vehicle
            </button> */}
            <button className="btn_dash_admin" onClick={handlePrint}>
              Generate Report
            </button>
          </div>
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Delivery
            <span className="sub_topic_inventory"> Details</span>{" "}
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">name</th>
                <th className="admin_tbl_th">gmail</th>
                <th className="admin_tbl_th">phone</th>
                <th className="admin_tbl_th">location</th>
                <th className="admin_tbl_th">status</th>
                <th className="admin_tbl_th">action</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br></br>
                <h1 className="con_topic">
                  No <span className="clo_us"> Found</span>{" "}
                </h1>
              </div>
            ) : (
              <tbody>
                {deliveries.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{item.name}</td>
                    <td className="admin_tbl_td">{item.gmail}</td>
                    <td className="admin_tbl_td">{item.phone}</td>
                    <td className="admin_tbl_td">{item.locatin}</td>
                    <td className="admin_tbl_td">
                      {item.status || "Not yet accepted"}
                    </td>
                    <td className="admin_tbl_td">
                      <Link
                        to={`/driveraccept/${item._id}`}
                        className="btn_dash_admin"
                      >
                        Accept
                      </Link>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="btn_dash_admin_dlt"
                      >
                        Delete
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

export default DliveryData;
