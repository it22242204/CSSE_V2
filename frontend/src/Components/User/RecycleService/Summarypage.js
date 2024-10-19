import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Summarystyles.css'; // Adjust the path if necessary
import AfterNav from '../Home/NavBar/AfterNav';
import Footer from '../../Footer/Footer';

const SummaryPage = () => {
  const navigate = useNavigate(); 
  const location = useLocation();

  const initialWasteDetails = location.state?.wasteDetails || [];
  const [wasteDetails, setWasteDetails] = useState(initialWasteDetails);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [accountname, setAccountname] = useState('');
  const [bankname, setBankname] = useState('');
  const [accountnumber, setAccountnumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [useraddress, setUserAddress] = useState('');

  // Retrieve user email from localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    console.log("Email from local storage:", email); // Debugging line
    if (email) {
      setUserEmail(email);
    } else {
      alert('User email not found. Please log in.');
      navigate('/login');
    }
    const address = localStorage.getItem('userAddress');
    console.log("Address from local storage:", address); // Debugging line
    if (address) {
      setUserAddress(address);
    } else {
      alert('User address not found. Please log in.');
      navigate('/login');
    }
  }, [navigate]);
   

  // Calculate subtotal dynamically
  const subtotal = wasteDetails.reduce(
    (total, waste) => total + waste.pricePerKg * waste.quantity,
    0
  );

  const handleConfirm = async () => {
    if (paymentMethod === 'Card' && (!accountname || !bankname || !accountnumber)) {
      alert('Please fill in all card details.');
      return;
    }

    const paymentDetails = {
      email: userEmail,
      wasteDetails: wasteDetails.map((waste) => ({
        name: waste.name,
        pricePerKg: waste.pricePerKg,
        quantity: waste.quantity,
        total: waste.pricePerKg * waste.quantity,
      })),
      subtotal,
      address: useraddress,
      paymentMethod,
      cardDetails: paymentMethod === 'Card' ? [{ accountname, bankname, accountnumber }] : null,
    };

    try {
      const response = await fetch('http://localhost:8081/api/payment/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      alert('Payment details saved successfully!');
      console.log('Response:', data);

      navigate('/bill', { state: { paymentDetails } });
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving payment details. Please try again.');
    }
  };

  const handleRemoveWaste = (name) => {
    setWasteDetails((prevWasteDetails) =>
      prevWasteDetails.filter((waste) => waste.name !== name)
    );
  };

  return (
    <>
      <AfterNav />
      <div className="summary-container">
        <h1 className="summary-header">Summary of Waste Details</h1>
        <h4 className="summary-text">
          Recycling waste is a powerful act of stewardship, reducing our carbon footprint 
          and preserving resources for future generations. Your efforts today pave the way 
          for a sustainable tomorrow.
        </h4>

        {wasteDetails.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price/Kg</th>
                <th>Weight</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wasteDetails.map((waste) => (
                <tr key={waste.name}>
                  <td>{waste.name}</td>
                  <td>Rs {waste.pricePerKg}</td>
                  <td>{waste.quantity}</td>
                  <td>Rs {waste.pricePerKg * waste.quantity}</td>
                  <td>
                    <div
                      id="close-icon"
                      className="close-icon"
                      onClick={() => handleRemoveWaste(waste.name)}
                    >
                      &times;
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No waste details available.</p>
        )}

        <h3 className="subtotal">Subtotal: Rs {subtotal}</h3>

        <div className="payment-method">
          <h4>Select Payment Method:</h4>
          <div className="payment-options">
            <label className="payment-label">
              <input
                type="radio"
                value="Cash"
                checked={paymentMethod === 'Cash'}
                onChange={() => setPaymentMethod('Cash')}
              />
              Cash
            </label>
            <label className="payment-label">
              <input
                type="radio"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={() => setPaymentMethod('Card')}
              />
              Online
            </label>
          </div>

          {paymentMethod === 'Card' && (
            <div className="card-details">
              <input
                type="text"
                placeholder="Account-Holder"
                value={accountname}
                onChange={(e) => setAccountname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Bank-Name"
                value={bankname}
                onChange={(e) => setBankname(e.target.value)}
              />
              <input
                type="password"
                placeholder="Account-Number"
                value={accountnumber}
                onChange={(e) => setAccountnumber(e.target.value)}
              />
            </div>
          )}
        </div>

        <button onClick={handleConfirm} className="confirm-button">
          Confirm
        </button>
      </div>
      <Footer />
    </>
  );
};

export default SummaryPage;
