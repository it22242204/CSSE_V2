import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPayment.css';

function AddPayment() {

    const navigate=useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form submitted', { cardNumber, expiryDate, cvv, cardholderName });
      navigate('/specialpaymentsuc')
    };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="form-title">Payment Details</h2>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiration Date</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Payment</button>
      </form>
    </div>
  );
}

export default AddPayment;
