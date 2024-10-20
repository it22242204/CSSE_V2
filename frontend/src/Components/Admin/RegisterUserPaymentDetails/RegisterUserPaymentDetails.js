import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Sidebar from "../AdminDashBord/SideBar/Sidebar";
import { format } from 'date-fns'; // Importing from date-fns for formatting

const URL = "http://localhost:8080/userregisterpayment"; 

const fetchPayments = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function RegisterUserPaymentDetails() {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchPayments().then((data) => setPayments(data.payments));
  }, []);

  const handleSearch = () => {
    fetchPayments().then((data) => {
      const filtered = data.payments.filter((payment) =>
        Object.values(payment).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPayments(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Payment Details Report",
    onAfterPrint: () => alert("Payment Details Report Successfully Downloaded!"),
  });

  const deleteHandler = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this payment?");
    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Payment deleted successfully!");
        setPayments((prev) => prev.filter((payment) => payment._id !== _id));
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
        await axios.put(`${URL}/${_id}`, updatedPayment); 
        window.alert("Payment status updated to Refunded!");
        setPayments((prev) => 
          prev.map((payment) => 
            payment._id === _id ? { ...payment, status: "Refunded" } : payment
          )
        );
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
          <button className="btn_dash_admin" onClick={handlePrint}>Generate Report</button>
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Register User Payment <span className="sub_topic_inventory">Details</span>
          </h1>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">Name</th>
                <th className="admin_tbl_th">Collection Option</th>
                <th className="admin_tbl_th">Amount</th>
                <th className="admin_tbl_th">Currency</th>
                <th className="admin_tbl_th">Credited Date</th>
                <th className="admin_tbl_th">Status</th>
                <th className="admin_tbl_th">Action</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br />
                <h1 className="con_topic">
                  No <span className="clo_us">Results</span> Found
                </h1>
              </div>
            ) : (
              <tbody>
                {payments.map((payment, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">{payment.name}</td>
                    <td className="admin_tbl_td">{payment.colletionOption}</td>
                    <td className="admin_tbl_td">{payment.amount}</td>
                    <td className="admin_tbl_td">{payment.currency}</td>
                    {/* Format the createdAt field */}
                    <td className="admin_tbl_td">
                      {format(new Date(payment.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                    </td>
                    <td className="admin_tbl_td">{payment.status}</td>
                    <td className="admin_tbl_td">
                      <button onClick={() => updateHandler(payment._id)} className="btn_dash_admin">Update</button>
                      <button onClick={() => deleteHandler(payment._id)} className="btn_dash_admin_dlt">Delete</button>
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

export default RegisterUserPaymentDetails;