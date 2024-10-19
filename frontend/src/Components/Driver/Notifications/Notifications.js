import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import './Specialorderdis.css';
// import Nav from "../../Specialorder/Nav/Nav";
import Sidebar from "../DriverDashBord/SideBar/Sidebar";

const URL = "http://localhost:8080/orders";

const fetchOrders = async (status) => {
  return await axios.get(URL).then((res) => res.data.Orders.filter(order => order.status === status));
};

function Notifications() {
  const [Orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Fetch only accepted orders
  useEffect(() => {
    fetchOrders("Accepted").then((acceptedOrders) => {
      setOrders(acceptedOrders);
    });
  }, []);

  const history = useNavigate();

  // Handler for "Deny" button
  const denyOrderHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deny this order?"
    );

    if (confirmed) {
      try {
        await axios.put(`${URL}/updateStatus/${_id}`, { status: "Denied" });
        window.alert("Order denied successfully!");
        fetchOrders("Accepted").then((acceptedOrders) => {
          setOrders(acceptedOrders);
        });
      } catch (error) {
        console.error("Error denying order:", error);
      }
    }
  };

  // Handler for "Accepted" button
  const acceptOrderHandler = async (_id) => {
    try {
      await axios.put(`${URL}/updateStatus/${_id}`, { status: "Driver Accepted" });
      window.alert("Order accepted by driver successfully!");
      fetchOrders("Accepted").then((acceptedOrders) => {
        setOrders(acceptedOrders);
      });
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content:()=>componentRef.current,
    documentTitle: "Order Report",
    onAfterPrint: () => alert("Order Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    fetchOrders("Accepted").then((acceptedOrders) => {
      const filtered = acceptedOrders.filter((order) =>
        order.contactname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setOrders(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  return (
    <div>
      {/* <Nav /> */}
      <Sidebar/>
      <div className="children_div_admin">
        <div className="dash_button_set">
          {/* <button
            className="btn_dash_admin"
            onClick={() => (window.location.href = "/adddriver")}
          >
            Add New Driver
          </button> */}

          <table>
            <tbody>
              <tr>
                <td>
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
            </tbody>
          </table>
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>

        <div className="tbl_con_admin" ref={componentRef}>
          <h1 className="topic_inventory">
            Special Collection
            <span className="sub_topic_inventory"> Notifications</span>{" "}
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">Contact Name</th>
                <th className="admin_tbl_th">Type of User</th>
                <th className="admin_tbl_th">Email</th>
                <th className="admin_tbl_th">Address</th>
                <th className="admin_tbl_th">List of Items</th>
                <th className="admin_tbl_th">Preferred Date</th>
                <th className="admin_tbl_th">Preferred Time</th>
                <th className="admin_tbl_th">Total Weight</th>
                <th className="admin_tbl_th">Total Amount</th>
                <th className="admin_tbl_th">Actions</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br />
                <h1 className="con_topic">
                  No <span className="clo_us">Orders</span> Found
                </h1>
              </div>
            ) : (
              <tbody>
                {Orders.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{item.contactname}</td>
                    <td className="admin_tbl_td">{item.typeofuser}</td>
                    <td className="admin_tbl_td">{item.contactemail}</td>
                    <td className="admin_tbl_td">{item.address}</td>
                    <td className="admin_tbl_td">{item.listofitems}</td>
                    <td className="admin_tbl_td">{item.prefereddate}</td>
                    <td className="admin_tbl_td">{item.preferedtime}</td>
                    <td className="admin_tbl_td">{item.totalweight}</td>
                    <td className="admin_tbl_td">{item.totalamount}</td>
                    <td className="admin_tbl_td">
                      <button
                        onClick={() => acceptOrderHandler(item._id)}
                        className="btn_dash_admin"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => denyOrderHandler(item._id)}
                        className="btn_dash_admin_dlt"
                      >
                        Deny
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

export default Notifications;
