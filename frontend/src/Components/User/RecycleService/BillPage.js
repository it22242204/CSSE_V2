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

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Payment Receipt', 105, 20, { align: 'center' }); // Center the title

    // Add downloaded date and time
    const now = new Date();
    const formattedDate = now.toLocaleString();
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Downloaded on: ${formattedDate}`, 20, 30); 

    // Add separator line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35); // Draw a line under the header

    // Add customer email and address section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Information', 20, 45);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const emailY = 55; // y-coordinate for email
    const addressY = emailY + 10;
    doc.text(`Email: ${paymentDetails.email}`, 20, emailY);
    doc.text(`Address: ${paymentDetails.address}`, 20, addressY);

    // Add scheduled date and time
    const scheduledY = addressY + 20;
    doc.setFont('helvetica', 'bold');
    doc.text('Scheduled Information', 20, scheduledY);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Scheduled Date: ${paymentDetails.date}`, 20, scheduledY + 10); // Use the date from paymentDetails
    doc.text(`Scheduled Time: ${paymentDetails.time}`, 20, scheduledY + 20); // Use the time from paymentDetails

    // Add waste details table
    const wasteData = paymentDetails.wasteDetails.map((waste) => [
      waste.name,
      `Rs ${waste.pricePerKg.toFixed(2)}`, 
      `${waste.quantity} Kg`, 
      `Rs ${waste.total.toFixed(2)}`
    ]);

    // Define the starting position for the table
    const startY = scheduledY + 40;
    doc.autoTable({
      startY: startY,
      head: [['Name', 'Price/Kg', 'Weight', 'Total']],
      body: wasteData,
      styles: { cellPadding: 5, fontSize: 12, valign: 'middle' },
      headStyles: { fillColor: [0, 123, 255], textColor: 255 }, // Blue header with white text
      theme: 'striped', // Optional: striped rows for better readability
      columnStyles: {
        1: { halign: 'right' }, // Align price to the right
        2: { halign: 'center' }, // Center-align weight
        3: { halign: 'right' } // Align total to the right
      }
    });

    // Add subtotal and payment method
    const subtotalY = doc.lastAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal: Rs ${paymentDetails.subtotal.toFixed(2)}`, 20, subtotalY);

    const paymentMethodY = subtotalY + 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Payment Method: ${paymentDetails.paymentMethod}`, 20, paymentMethodY);

    // Add card details if payment method is 'Card'
    if (paymentDetails.paymentMethod === 'Card' && paymentDetails.cardDetails) {
      const cardDetailsY = paymentMethodY + 20;
      doc.setFont('helvetica', 'bold');
      doc.text('Card Details:', 20, cardDetailsY);

      const { accountname, bankname, accountnumber } = paymentDetails.cardDetails[0];
      doc.setFont('helvetica', 'normal');
      doc.text(`Account Name: ${accountname}`, 20, cardDetailsY + 10);
      doc.text(`Bank Name: ${bankname}`, 20, cardDetailsY + 20);
      doc.text(`Account Number: ${accountnumber}`, 20, cardDetailsY + 30);
    }

    // Add a thank-you message at the bottom
    const footerY = paymentDetails.paymentMethod === 'Card' 
      ? doc.lastAutoTable.finalY + 100 
      : doc.lastAutoTable.finalY + 60;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text('Thank you for using our recycling service!', 105, footerY, { align: 'center' });

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
        <h3 className="subtotal">Date: {paymentDetails.date}</h3>
        <h3 className="subtotal">Time: {paymentDetails.time}</h3>
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