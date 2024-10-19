import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation between routes
import Sidebar from '../AdminDashBord/SideBar/Sidebar'; // Import the Sidebar component

const AdminPanel = () => {
  const [paymentDetails, setPaymentDetails] = useState([]); 
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null); 
  const [notification, setNotification] = useState(''); // State for notifications
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchData(); 
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/payment/'); 
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

  const handleStatusChange = async (index, status) => {
    const paymentId = paymentDetails[index]._id; 

    try {
      const response = await axios.patch(`http://localhost:8080/api/payment/${paymentId}/status`, { status }); 
      console.log('Server Response:', response.data); 

      // Optimistically update the local state
      setPaymentDetails(prevDetails => {
        const updatedDetails = [...prevDetails]; 
        updatedDetails[index].status = status; 
        return updatedDetails; 
      });

      // Set notification message if status is Completed
      if (status === 'Completed') {
        setNotification('Payment request has been marked as Completed.'); // Set the notification message
      }
    } catch (error) {
      console.error('Error updating payment status:', error); 
      alert('Failed to update payment status. Please try again later.'); 
    }
  };

  const handleAssignDriver = (orderId) => {
    navigate(`/assigndriver`, { state: { orderId } }); 
  };

  return (
    <>
      <Sidebar /> 
      <div style={styles.container}> 
        <h2 style={styles.heading}>Recyclable Wastes Requests Received</h2> 
        
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
                      {payment.status === 'Pending' && (
                        <>
                          <button
                            style={styles.acceptButton} 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              handleStatusChange(index, 'Accepted'); 
                            }}
                          >
                            Accept
                          </button>
                          <button
                            style={styles.denyButton} 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              handleStatusChange(index, 'Denied'); 
                            }}
                          >
                            Deny
                          </button>
                        </>
                      )}
                      {payment.status === 'Accepted' && (
                        <>
                          <button
                            style={styles.payButton} 
                            onClick={(e) => {
                              e.stopPropagation(); 
                              handleStatusChange(index, 'Completed'); 
                            }}
                          >
                            Pending
                          </button>
                          <button
                            style={{
                              ...styles.assignButton,
                              cursor: payment.status === 'Accepted' ? 'pointer' : 'not-allowed', 
                              backgroundColor: payment.status === 'Accepted' ? '#2196F3' : '#ccc' 
                            }}
                            onClick={(e) => {
                              e.stopPropagation(); 
                              handleAssignDriver(payment._id); 
                            }}
                          >
                            Assign Driver
                          </button>
                        </>
                      )}
                      {payment.status === 'Denied' && (
                        <button
                          style={{
                            ...styles.completedButton,
                            cursor: 'not-allowed',
                            backgroundColor: '#808080', // Indicate denied status
                          }}
                        >
                          Denied
                        </button>
                      )}
                      {payment.status === 'Completed' && (
                        <button
                          style={{
                            ...styles.completedButton,
                            cursor: 'not-allowed',
                            backgroundColor: '#808080', // Indicate completed status
                          }}
                        >
                          Completed
                        </button>
                      )}
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
    </>
  );
};

// Styles for the component
const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  notification: { // Style for notification message
    padding: '10px',
    backgroundColor: '#2196F3',
    color: '#fff',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  },
  orderRow: {
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', 
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: '5px',
  },
  denyButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  payButton: {
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: '5px',
  },
  assignButton: {
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  completedButton: {
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: '5px',
  },
  detailsContainer: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  innerTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  cardDetails: {
    marginBottom: '10px',
  },
  noData: {
    textAlign: 'center',
    color: '#777',
  }
};

export default AdminPanel;
