import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add the navigate hook
import './RequestHandling.css';
import Sidebar from '../AdminDashBord/SideBar/Sidebar';

const RequestHandling = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for accepting request
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/regularcollection");
        console.log('Fetched Requests:', response.data);

        const data = Array.isArray(response.data.regularCollections) ? response.data.regularCollections : [];
        setRequests(data);
      } catch (error) {
        console.error('Error fetching the requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id, phoneNumber) => {
    try {
      setIsLoading(true); // Start loading

      // Accept the request in the backend
      await axios.put(`http://localhost:8080/regularcollection/${id}/accept`);
      
      // Notify the admin
      alert('Request Accepted!');

      // Notify the user via the backend notification service (SMS, Email, etc.)
      await axios.post('http://localhost:8080/notifications/send', {
        phoneNumber,
        message: 'Your waste collection request has been accepted!',
      });

      // Update UI - remove the accepted request from the list
      setRequests(prevRequests => 
        prevRequests.filter(request => request._id !== id)
      );
    } catch (error) {
      console.error('Error accepting the request:', error);
      alert('Failed to accept the request. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleAssignDriver = (id) => {
    // Navigate to AssignDriver page and pass the request ID
    navigate(`/assigndriver`);
  };

  return (
    <div>
      <Sidebar />
      <div className="request-table-container">
        <h2>Regular Collection Requests</h2>
        {requests.length > 0 ? (
          <table className="request-table">
            <thead>
              <tr>
                <th>Type of User</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Collection Option</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.TypeofUser}</td>
                  <td>{request.Name}</td>
                  <td>{request.PhoneNumber}</td>
                  <td>{request.Address}</td>
                  <td>{request.ColletionOption}</td>
                  <td>{request.Amount}</td>
                  <td>
                    <button 
                      onClick={() => handleAccept(request._id, request.PhoneNumber)} 
                      className="accept-button"
                      disabled={isLoading} // Disable button while loading
                    >
                      {isLoading ? 'Processing...' : 'Accept'}
                    </button>
                    <button onClick={() => handleAssignDriver(request._id)} className="assign-button">
                      Assign Driver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No collection requests available.</p>
        )}
      </div>
    </div>
  );
};

export default RequestHandling;
