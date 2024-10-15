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
    status: "pending",
  });
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting payment...");
    try {
      await axios.post("http://localhost:8080/payments/", payment);
      alert("Payment added successfully.");
      navigate("/adddlilivey");
    } catch (error) {
      console.error(
        "Error adding payment:",
        error.response.data.message || "Server error"
      );
      setError(error.response.data.message || "Server error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="payment-container">
        <h1 className="topic_mash_mart">
          Add
          <span className="sub_topic_mash_mart"> Payment</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <div>
              <label className="form_box_item_lable">Amount:</label>
              <input
                className="form_box_item_input"
                type="number"
                name="amount"
                value={payment.amount}
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
            </div>
            <div>
              <label className="form_box_item_lable">Card Expiry:</label>
              <input
                className="form_box_item_input"
                type="date"
                name="cardExpiry"
                value={payment.cardExpiry}
                onChange={handleChange}
                required
              />
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
            </div>
            <button className="admin_form_cneter_btn" type="submit">
              Pay
            </button>
            {error && <p className="payment-error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
