import React, { useState } from "react";
import axios from "axios";

const SpecialCollectionPayment = ({ contactname, totalamount, closeModal }) => {
  const [formData, setFormData] = useState({
    amount: totalamount || "",
    currency: "LKR",
    cardNumber: "",
    cardExpiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value); // Validate field on change
  };

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

    // Check for errors before submitting
    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const dataToSend = {
      ...formData,
      contactname: contactname,
      totalamount: totalamount,
      status: "Paid",
    };

    try {
      await axios.post("http://localhost:8080/specialpayment", dataToSend);
      alert("Payment added successfully");
      closeModal(); // Close modal after successful payment
    } catch (error) {
      console.error("There was an error adding the payment!", error);
    }
  };

  // Get the current year and month to set the minimum value for the month input
  const getCurrentMonthYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-indexed, so add 1
    return `${year}-${String(month).padStart(2, '0')}`; // Format as YYYY-MM
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add Payment for {contactname}</h2>

        <label style={styles.label}>Amount:</label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          readOnly
          style={styles.input}
        />

        <label style={styles.label}>Currency:</label>
        <select name="currency" value={formData.currency} onChange={handleChange} style={styles.input}>
          <option value="LKR">LKR</option>
        </select>

        <label style={styles.label}>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.cardNumber && <p style={styles.error}>{errors.cardNumber}</p>} {/* Display error */}

        <label style={styles.label}>Card Expiry:</label>
        <input
          type="month"
          name="cardExpiry"
          value={formData.cardExpiry}
          onChange={handleChange}
          min={getCurrentMonthYear()} // Set minimum value to current month
          style={styles.input}
        />
        {errors.cardExpiry && <p style={styles.error}>{errors.cardExpiry}</p>} {/* Display error */}

        <label style={styles.label}>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.cvv && <p style={styles.error}>{errors.cvv}</p>} {/* Display error */}

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Confirm Payment</button>
          <button type="button" onClick={closeModal} style={styles.buttonCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "90%", // Make it responsive
    maxWidth: "400px", // Limit maximum width
    boxSizing: "border-box", // Include padding and border in width
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginBottom: "1rem",
    textAlign: "center", // Center the heading
  },
  label: {
    marginBottom: "0.5rem",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%", // Full width for inputs
    boxSizing: "border-box", // Include padding and border in width
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between", // Space out buttons
  },
  button: {
    padding: "0.5rem",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: "1", // Allow button to grow
    marginRight: "0.5rem", // Space between buttons
  },
  buttonCancel: {
    padding: "0.5rem",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: "1", // Allow button to grow
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
};

export default SpecialCollectionPayment;