import React, { useState } from "react";
import axios from "axios";

const AddRegisterUserPayment = ({ Name, Amount, ColletionOption, closeModal }) => {
  const [formData, setFormData] = useState({
    amount: Amount,
    currency: "LKR",
    cardNumber: "",
    cardExpiry: "",
    cvv: "",
    name: Name,
    colletionOption: ColletionOption,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "cardExpiry":
        const today = new Date();
        const [year, month] = value.split("-").map(Number);
        const expiryDate = new Date(year, month - 1);
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

    if (Object.values(errors).some((error) => error)) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const dataToSend = {
      ...formData,
      status: "Paid",
    };

    try {
      await axios.post("http://localhost:8080/userregisterpayment", dataToSend);
      alert("Payment added successfully");
      closeModal(); 
    } catch (error) {
      console.error("There was an error adding the payment!", error);
    }
  };

  const getCurrentMonthYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    return `${year}-${String(month).padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add Payment</h2>

        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          readOnly
          style={styles.input}
        />

        <label style={styles.label}>Collection Option:</label>
        <input
          type="text"
          name="collectionOption"
          value={formData.colletionOption}
          readOnly
          style={styles.input}
        />
        
        <label style={styles.label}>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          readOnly
          style={styles.input}
        />
        
        <label style={styles.label}>Currency:</label>
        <input
          type="text"
          name="currency"
          value={formData.currency}
          readOnly
          style={styles.input}
        />
        
        <label style={styles.label}>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        {errors.cardNumber && <p style={styles.error}>{errors.cardNumber}</p>}

        <label style={styles.label}>Card Expiry:</label>
        <input
          type="month"
          name="cardExpiry"
          value={formData.cardExpiry}
          onChange={handleChange}
          required
          min={getCurrentMonthYear()}
          style={styles.input}
        />
        {errors.cardExpiry && <p style={styles.error}>{errors.cardExpiry}</p>}

        <label style={styles.label}>CVV:</label>
        <input
          type="password"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          required
          style={styles.input}
        />
        {errors.cvv && <p style={styles.error}>{errors.cvv}</p>}

        <div style={styles.buttonContainer}>
          <button type="button" style={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" style={styles.submitButton}>
            Add Payment
          </button>
        </div>
      </form>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: '15px', // Reduced padding for smaller form
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '90%', // Use percentage for width to make it responsive
    maxWidth: '350px', // Adjust max width to be smaller
    margin: '20px auto',
    position: 'relative',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '15px', // Reduced margin
    color: '#333',
    fontSize: '1.5rem', // Smaller heading size
  },
  label: {
    fontSize: '12px', // Smaller label size
    marginBottom: '5px', // Reduced margin
    color: '#555',
  },
  input: {
    padding: '8px', // Reduced padding
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px', // Reduced margin
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px', // Reduced margin
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px', // Reduced padding
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '48%', // Adjust width
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px', // Reduced padding
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '48%', // Adjust width
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: "0 0 10px 0",
  },
};

export default AddRegisterUserPayment;