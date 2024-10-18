import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Optional, for easier table handling in PDFs
import './BillPageStyles.css'; // Adjust path if necessary
import AfterNav from '../Home/NavBar/AfterNav';
import Footer from '../../Footer/Footer';

const BillPage = () => {
  const location = useLocation();
  const { paymentDetails } = location.state || {}; // Retrieve payment details passed via state
  const navigate = useNavigate();

  const handleOk = () => {
    // Clear waste types from local storage
    localStorage.removeItem('wasteTypes'); // Adjust the key based on your storage

    // Retrieve existing order history from localStorage or initialize an empty array
    const existingHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Add the new order to the history
    const newOrder = {
      ...paymentDetails,
      orderDate: new Date().toLocaleString(), // Store the order date and time
    };

    // Save the updated order history back to localStorage
    localStorage.setItem('orderHistory', JSON.stringify([...existingHistory, newOrder]));

    // Redirect to the summary page or any other desired route
    navigate('/waste');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Payment Receipt', 20, 20);
    
    // Add downloaded date and time
    const now = new Date();
    const formattedDate = now.toLocaleString(); // Format the date and time
    doc.setFontSize(12);
    doc.text(`Downloaded on: ${formattedDate}`, 20, 30); // Add date below the title
  
    // Add email and address
    doc.setFontSize(14);
    const emailY = 40;  // y-coordinate for email
    const addressY = emailY + 10; // y-coordinate for address
    doc.text(`Email: ${paymentDetails.email}`, 20, emailY);
    doc.text(`Address: ${paymentDetails.address}`, 20, addressY);
  
    // Add waste details table
    const wasteData = paymentDetails.wasteDetails.map((waste) => [
      waste.name, 
      `Rs ${waste.pricePerKg}`, 
      waste.quantity, 
      `Rs ${waste.total}`
    ]);
  
    // Define the starting position for the table
    const startY = addressY + 20; // 20 units below the address
    doc.autoTable({
      startY: startY,
      head: [['Name', 'Price/Kg', 'Weight', 'Total']],
      body: wasteData,
      styles: { cellPadding: 3, fontSize: 12 }, // Add some padding for better readability
      theme: 'grid' // Optional: add grid style to the table
    });
  
    // Add subtotal and payment method
    const subtotalY = doc.lastAutoTable.finalY + 10; // 10 units below the table
    doc.text(`Subtotal: Rs ${paymentDetails.subtotal}`, 20, subtotalY);
    const paymentMethodY = subtotalY + 10; // 10 units below the subtotal
    doc.text(`Payment Method: ${paymentDetails.paymentMethod}`, 20, paymentMethodY);
  
    // Add card details if payment method is 'Card'
    if (paymentDetails.paymentMethod === 'Card' && paymentDetails.cardDetails) {
      const cardDetailsY = paymentMethodY + 20; // 20 units below the payment method
      doc.text('Card Details:', 20, cardDetailsY);
      
      const { accountname, bankname, accountnumber } = paymentDetails.cardDetails[0];
      doc.text(`Account Name: ${accountname}`, 20, cardDetailsY + 10);
      doc.text(`Bank Name: ${bankname}`, 20, cardDetailsY + 20);
      doc.text(`Account Number: ${accountnumber}`, 20, cardDetailsY + 30);
    }
  
    // Save the PDF
    doc.save('PaymentReceipt.pdf');
  };

  return (
    <>
      <AfterNav />
      <div className="bill-container">
        <h1 className="bill-header">Payment Receipt</h1>
        <h2>Email: {paymentDetails.email}</h2>
        <h3>Waste Details:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price/Kg</th>
              <th>Weight</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.wasteDetails.map((waste, index) => (
              <tr key={index}>
                <td>{waste.name}</td>
                <td>Rs {waste.pricePerKg}</td>
                <td>{waste.quantity}</td>
                <td>Rs {waste.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="subtotal">Subtotal: Rs {paymentDetails.subtotal}</h3>
        <h3 className="subtotal">Address: {paymentDetails.address}</h3>
        <h3>Payment Method: {paymentDetails.paymentMethod}</h3>

        {paymentDetails.paymentMethod === 'Card' && paymentDetails.cardDetails && (
          <div className="card-details">
            <h4>Card Details:</h4>
            <p>Account Name: {paymentDetails.cardDetails[0].accountname}</p>
            <p>Bank Name: {paymentDetails.cardDetails[0].bankname}</p>
            <p>Account Number: {paymentDetails.cardDetails[0].accountnumber}</p>
          </div>
        )}

        <button onClick={generatePDF} className="ok-button">
          Download Report
        </button>
        <button onClick={handleOk} className="ok-button">
          OK
        </button>
      </div>
      <Footer />
    </>
  );
};

export default BillPage;
