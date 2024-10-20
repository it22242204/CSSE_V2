import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPayment = ({ cartItems }) => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    amount: 0, // Initialize amount to 0
    currency: "LKR",
    cardNumber: "",
    cardExpiry: "",
    cvv: "",
    status: "paid",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({}); // State to store validation errors

  // Calculate total amount and set the payment details
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const totalAmount = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.total),
        0
      );
      setPayment((prevPayment) => ({
        ...prevPayment,
        amount: totalAmount,
      }));
    }
  }, [cartItems]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "cardExpiry":
        const today = new Date();
        const [year, month] = value.split("-").map(Number);
        const expiryDate = new Date(year, month - 1); // MM starts from 0 in Date object
        if (expiryDate <= today) {
          error = "Card expiry must be a future date.";
        }
        break;
      case "cvv":
        if (!/^\d{3}$/.test(value)) {
          error = "CVV must be exactly 3 digits.";
        }
        break;
      case "cardNumber":
        if (!/^\d{16}$/.test(value)) {
          error = "Card number must be exactly 16 digits.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    for (const [key, value] of Object.entries(payment)) {
      validateField(key, value);
    }

    // Check for errors before submitting
    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const paymentData = {
        ...payment,
        cartItems, // Send cart items in the request
      };
      await axios.post("http://localhost:8080/payments/", paymentData);
      alert("Payment added successfully.");
      navigate("/adddelivery");
    } catch (error) {
      console.error(
        "Error adding payment:",
        error.response?.data?.message || "Server error"
      );
      setError(error.response?.data?.message || "Server error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
    validateField(name, value); // Validate field on change
  };


// Get current month and year
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1

  // Inline styles as JS objects
  const styles = {
    cartItemsTable: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "20px 0",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      color: "black",
    },
    tableRow: {
      backgroundColor: "#fff",
    },
    tableRowHover: {
      backgroundColor: "#f1f1f1",
    },
  };

  return (
    <div className="payment-container">
      <h1 className="topic_mash_mart">
        Add <span className="sub_topic_mash_mart">Payment</span>
      </h1>
      <div className="item_full_box">
        <form className="item_form_admin" onSubmit={handleSubmit}>
          {/* Cart Items Table */}
          <h2>Cart Items:</h2>
          <table style={styles.cartItemsTable}>
            <thead>
              <tr>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Item Name</th>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Quantity (kg)</th>
                <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Total (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{item.name}</td>
                  <td style={styles.tableCell}>{item.qty}</td>
                  <td style={styles.tableCell}>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />

          <div>
            <label className="form_box_item_lable">Total Amount:</label>
            <input
              className="form_box_item_input"
              type="number"
              name="amount"
              value={payment.amount.toFixed(2)}
              readOnly
            />
          </div>
          <div>
            <label className="form_box_item_lable">Currency:</label>
            <input
              className="form_box_item_input"
              type="text"
              name="currency"
              value={payment.currency}
              readOnly
            />
          </div>
          <div>
            <label className="form_box_item_lable">Card Number:</label>
            <input
              className="form_box_item_input"
              type="text"
              name="cardNumber"
              value={payment.cardNumber}
              onChange={handleChange}
              required
            />
            {errors.cardNumber && <p className="payment-error-message">{errors.cardNumber}</p>} {/* Display error */}
          </div>
          <div>
            <label className="form_box_item_lable">Card Expiry:</label>
            <input
              className="form_box_item_input"
              type="month"
              name="cardExpiry"
              value={payment.cardExpiry}
              onChange={handleChange}
              required
            />
            {errors.cardExpiry && <p className="payment-error-message">{errors.cardExpiry}</p>} {/* Display error */}
          </div>
          <div>
            <label className="form_box_item_lable">CVV:</label>
            <input
              className="form_box_item_input"
              type="text"
              name="cvv"
              value={payment.cvv}
              onChange={handleChange}
              required
            />
            {errors.cvv && <p className="payment-error-message">{errors.cvv}</p>} {/* Display error */}
          </div>
          <button className="admin_form_cneter_btn" type="submit">
          {/* onClick={() => (window.location.href = "/adddelivery")} */}
            Pay
          </button>
          {error && <p className="payment-error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPayment;