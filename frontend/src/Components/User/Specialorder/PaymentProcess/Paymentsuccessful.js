import React from 'react';

import './Paymentsuccess.css';
import { useNavigate } from 'react-router-dom';
import successImage from '../Images/pay.png';


function Paymentsuccessful() {
    const navigate = useNavigate();
  
    const handleContinue = () => {
      navigate('/specialorderdetails');
    };

  return (
    <div className="payment-success-container">
    <div className="payment-success-box">
      <img src={successImage} alt="Success" className="payment-success-image" />
      <h1 className="payment-success-title">Payment Successful!</h1>
      <p className="payment-success-message">Thank you for your payment. Your transaction has been completed successfully.</p>
      <button className="payment-success-button" onClick={handleContinue}>Continue</button>
    </div>
  </div>
  );
}


export default Paymentsuccessful;
