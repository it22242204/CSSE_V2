import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import './Specialorderdis.css';
// import Nav from "../../../Specialorder/Nav/Nav";
import Sidebar from "../../AdminDashBord/SideBar/Sidebar";

const URL = "http://localhost:8080/orders";

const fetchOrders = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SpecialOrderdis() {
  const [Orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchOrders().then((data) => {
      const pendingOrders = data.Orders.filter(order => order.status === "Pending");
      setOrders(pendingOrders);
    });
  }, []);

  const history = useNavigate();

  const updateOrderStatus = async (_id, newStatus) => {
    try {
      await axios.put(`${URL}/updateStatus/${_id}`, { status: newStatus });
      
      window.alert(`Order ${newStatus.toLowerCase()} successfully!`);
      fetchOrders().then((data) => {
        const pendingOrders = data.Orders.filter(order => order.status === "Pending");
        setOrders(pendingOrders);
      });
    } catch (error) {
      console.error(`Error updating order to ${newStatus}:`, error);
    }
  };

  const handleSearch = () => {
    fetchOrders().then((data) => {
      const filtered = data.Orders.filter((order) =>
        order.contactname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setOrders(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Order Report",
    onAfterPrint: () => alert("Order Report Successfully Downloaded!"),
  });

  return (
    <div>
      {/* <Nav /> */}
      <Sidebar/>
      <div className="children_div_admin">
        <div className="dash_button_set">
          <button
            className="btn_dash_admin"
            onClick={() => (window.location.href = "/adddriver")}
          >
            Add New Driver
          </button>

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
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>

        <div className="tbl_con_admin" ref={componentRef}>
          <h1 className="topic_inventory">
            Special Collection
            <span className="sub_topic_inventory"> Details</span>{" "}
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
                        onClick={() => updateOrderStatus(item._id, "Accepted")}
                        className="btn_dash_admin"
                      >
                        Assign Driver
                      </button>
                      <button
                        onClick={() => updateOrderStatus(item._id, "Denied")}
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

export default SpecialOrderdis;
