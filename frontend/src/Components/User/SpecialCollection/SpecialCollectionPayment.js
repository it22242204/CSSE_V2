import React, { useState } from "react";
import axios from "axios";

const SpecialCollectionPayment = ({ Amount,ColletionOption, closeModal }) => {
  const [formData, setFormData] = useState({
    amount: Amount, // Pre-fill with passed Amount
    currency: "LKR",
    cardNumber: "",
    cardExpiry: "",
    cvv: "",
    name: "", // Pre-fill with passed Name
    colletionOption:ColletionOption,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      status: "Paid"
    };

    try {
      await axios.post("http://localhost:8080/specialpayment", dataToSend);
      alert("Payment added successfully");
      closeModal(); // Close popup after successful submission
    } catch (error) {
      console.error("There was an error adding the payment!", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add Payment</h2>
        
        
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
        
        <label style={styles.label}>Card Expiry (MM/YY):</label>
        <input
          type="text"
          name="cardExpiry"
          value={formData.cardExpiry}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
        <label style={styles.label}>CVV:</label>
        <input
          type="password"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
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
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: '0 auto',
    position: 'relative',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  label: {
    fontSize: '14px',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '45%',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '45%',
  }
};

export default SpecialCollectionPayment;
