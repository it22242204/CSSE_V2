import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../AdminDashBord/SideBar/Sidebar";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8081/payments");
        setPayments(response.data.payments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handleSearch = () => {
    const filtered = payments.filter((payment) =>
      Object.values(payment).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setPayments(filtered);
    setNoResults(filtered.length === 0);
  };

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this payment?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8081/payments/${_id}`);
        setPayments((prev) => prev.filter((payment) => payment._id !== _id));
        window.alert("Payment deleted successfully!");
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const updateHandler = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to update the status to Refunded?");
    if (confirmed) {
      try {
        const updatedPayment = {
          status: "Refunded",
        };
        await axios.put(`http://localhost:8081/payments/${_id}`, updatedPayment);
        setPayments((prev) =>
          prev.map((payment) =>
            payment._id === _id ? { ...payment, status: "Refunded" } : payment
          )
        );
        window.alert("Payment status updated to Refunded!");
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="children_div_admin">
        <div className="dash_button_set">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="search_input"
            placeholder="Search Here..."
          />
          <button onClick={handleSearch} className="btn_dash_admin">Search</button>
        </div>

        <div className="tbl_con_admin">
          <h1 className="topic_inventory">
            Payment <span className="sub_topic_inventory">List</span>
          </h1>
          {noResults ? (
            <div>
              <h1 className="con_topic">
                No <span className="clo_us">Results</span> Found
              </h1>
            </div>
          ) : (
            <table className="table_details_admin">
              <thead>
                <tr className="admin_tbl_tr">
                  <th className="admin_tbl_th">Cart Items</th>
                  <th className="admin_tbl_th">Amount</th>
                  <th className="admin_tbl_th">Currency</th>
                  <th className="admin_tbl_th">Status</th>
                  <th className="admin_tbl_th">Card Number</th>
                  <th className="admin_tbl_th">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr className="admin_tbl_tr" key={payment._id}>
                    <td className="admin_tbl_td">
                      <table className="cart_items_table">
                        <thead>
                          <tr>
                            <th>Item Name  </th>
                            <th>Quantity(kg)   </th>
                            <th>Total(Rs)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment.cartItems.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.qty}</td>
                              <td>{item.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="admin_tbl_td">{payment.amount}</td>
                    <td className="admin_tbl_td">{payment.currency}</td>
                    <td className="admin_tbl_td">{payment.status}</td>
                    <td className="admin_tbl_td">{payment.cardNumber}</td>
                    <td className="admin_tbl_td">
                      <button onClick={() => updateHandler(payment._id)} className="btn_dash_admin">Update</button>
                      <button onClick={() => deleteHandler(payment._id)} className="btn_dash_admin_dlt">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;
