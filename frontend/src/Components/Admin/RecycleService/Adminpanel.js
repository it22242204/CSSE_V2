import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/payment/');
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setPaymentDetails(response.data);
      } else {
        console.error('Unexpected structure:', response.data);
        alert('Unexpected response structure. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch payment details. Please try again later.');
    }
  };

  const toggleOrderDetails = (index) => {
    setExpandedOrderIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleStatusChange = async (index) => {
    const paymentId = paymentDetails[index]._id; // Get the payment ID

    try {
        const response = await axios.patch(`http://localhost:8081/api/payment/${paymentId}/status`, { status: 'Completed' });
        console.log('Server Response:', response.data); // Log the server response

        // Optimistically update the local state
        setPaymentDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index].status = 'Completed'; // Change the status locally
            return updatedDetails;
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        alert('Failed to update payment status. Please try again later.');
    }
};

// Ensure fetchData correctly retrieves data on mount
useEffect(() => {
    fetchData(); // Refetch data when component mounts
}, []);

  

  const handleAssignDriver = (orderId) => {
    navigate(`/assigndriver`, { state: { orderId } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Panel - Orders</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th>Order No</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.length > 0 ? (
            paymentDetails.map((payment, index) => (
              <React.Fragment key={index}>
                <tr
                  onClick={() => toggleOrderDetails(index)}
                  style={{
                    ...styles.orderRow,
                    backgroundColor: expandedOrderIndex === index ? '#f1f1f1' : '#fff'
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{payment.email}</td>
                  <td>
                    {payment.status !== 'Completed' ? (
                      <button
                        style={styles.payButton}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row expansion when clicking the button
                          handleStatusChange(index); // Change status to Completed
                        }}
                      >
                        Pending
                      </button>
                    ) : (
                      <button
                        style={{ ...styles.payButton, cursor: 'not-allowed', backgroundColor: '#ccc' }}
                        disabled
                      >
                        Completed
                      </button>
                    )}
                    <button
                      style={{
                        ...styles.assignButton,
                        cursor: payment.status !== 'Completed' ? 'pointer' : 'not-allowed',
                        backgroundColor: payment.status !== 'Completed' ? '#2196F3' : '#ccc'
                      }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row expansion
                        if (payment.status !== 'Completed') { // Only allow if not completed
                          handleAssignDriver(payment.id);
                        }
                      }}
                      disabled={payment.status === 'Completed'} // Disable if completed
                    >
                      Assign Driver
                    </button>
                  </td>
                </tr>
                {expandedOrderIndex === index && (
                  <tr>
                    <td colSpan="3">
                      <div style={styles.detailsContainer}>
                        <h4>Waste Details:</h4>
                        <table style={styles.innerTable}>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Price/Kg</th>
                              <th>Weight</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payment.wasteDetails && payment.wasteDetails.length > 0 ? (
                              payment.wasteDetails.map((waste, wasteIndex) => (
                                <tr key={wasteIndex}>
                                  <td>{waste.name}</td>
                                  <td>Rs {waste.pricePerKg}</td>
                                  <td>{waste.quantity}</td>
                                  <td>Rs {waste.total}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4">No waste details available for this order.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        <h4 style={{ marginTop: '10px' }}>Payment Details:</h4>
                        <p><strong>Total Amount:</strong> Rs {payment.subtotal}</p>
                        <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>

                        {payment.paymentMethod === 'Card' && payment.cardDetails && (
                          payment.cardDetails.map((card, index) => (
                            <div key={index} style={styles.cardDetails}>
                              <p><strong>Account Holder:</strong> {card.accountname}</p>
                              <p><strong>Bank Name:</strong> {card.bankname}</p>
                              <p><strong>Account Number:</strong> {card.accountnumber}</p>
                            </div>
                          ))
                        )}

                        <h4 style={{ marginTop: '10px' }}>Address:</h4>
                        <p>{payment.address || 'No address provided.'}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.noData}>No payment details available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '10px'
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left'
  },
  orderRow: {
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  payButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  assignButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    marginLeft: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  detailsContainer: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginTop: '10px'
  },
  innerTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px'
  },
  cardDetails: {
    marginTop: '10px',
    backgroundColor: '#e7f3fe',
    padding: '10px',
    borderRadius: '8px'
  },
  noData: {
    textAlign: 'center',
    padding: '10px',
    color: '#999'
  }
};

export default AdminPanel;
