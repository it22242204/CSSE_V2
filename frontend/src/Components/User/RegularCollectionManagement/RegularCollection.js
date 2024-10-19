import React, { useState } from 'react';
import axios from 'axios';
import './RegularCollection.css';
import AfterNav from '../Home/NavBar/AfterNav';
import Footer from '../../Footer/Footer';
import AddRegisterUserPayment from './AddRegisterUserPayment'; // Import AddRegisterUserPayment component

const RegularCollection = () => {
  const [formData, setFormData] = useState({
    TypeofUser: '',
    Name: '',
    PhoneNumber: '',
    Address: '',
    ColletionOption: '',
    Amount: ''
  });

  const [showPaymentPopup, setShowPaymentPopup] = useState(false); // State to show/hide payment popup

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCollectionOptionChange = (e) => {
    const collectionOption = e.target.value;
    let amount = '';

    switch (collectionOption) {
      case 'Daily':
        amount = 20000;
        break;
      case 'Weekly Once':
        amount = 15000;
        break;
      case 'Two Week Once':
        amount = 10000;
        break;
      case 'Monthly':
        amount = 5000;
        break;
      default:
        amount = '';
    }

    setFormData({
      ...formData,
      ColletionOption: collectionOption,
      Amount: amount
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/regularcollection', formData);
      alert('Regular Collection Registered Successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error registering the collection:', error);
    }
  };
  
  const handlePayClick = () => {
    setShowPaymentPopup(true); // Show payment popup
  };

  const closeModal = () => {
    setShowPaymentPopup(false); // Hide payment popup
  };

  return (
    <div>
        <AfterNav />
        <div className="request-form-container">
          <h2>Register for Normal waste collection</h2>
          <form onSubmit={handleSubmit} className="request-form">
            <label>Type Of User</label>
            <select name="TypeofUser" value={formData.TypeofUser} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="HouseHoldUser">HouseHoldUser</option>
              <option value="BusinessUser">BusinessUser</option>
            </select>

            <label>User Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />

            <label>Contact Number</label>
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              placeholder="+94 *** ****"
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              placeholder="Street,city,state"
              required
            />

            <label>Collection Option</label>
            <select name="ColletionOption" value={formData.ColletionOption} onChange={handleCollectionOptionChange} required>
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly Once">Weekly Once</option>
              <option value="Two Week Once">Two Week Once</option>
              <option value="Monthly">Monthly</option>
            </select>

            <label>Amount</label>
            <input
              type="text" 
              name="Amount"
              value={formData.Amount}
              readOnly
            />

            <div className="form-buttons">
              <button type="button" className="cancel-button">Cancel</button>
              <button type="button" className="pay-button" onClick={handlePayClick}>Pay</button>
            </div>
          </form>
        </div>

        {/* Popup for payment form */}
        {showPaymentPopup && (
          <div className="payment-popup">
            <div className="popup-overlay" onClick={closeModal}></div>
            <div className="popup-content">
              <AddRegisterUserPayment 
                Name={formData.Name} 
                Amount={formData.Amount} 
                ColletionOption={formData.ColletionOption}
                closeModal={closeModal} 
              />
            </div>
          </div>
        )}

        <Footer />
    </div>
  );
};

export default RegularCollection;
