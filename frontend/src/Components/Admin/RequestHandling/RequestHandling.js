import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add the navigate hook
import './RequestHandling.css';
import Sidebar from '../AdminDashBord/SideBar/Sidebar';

const RequestHandling = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8081/regularcollection");
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
      await axios.put(`http://localhost:8081/regularcollection/${id}/accept`);
      alert('Request Accepted!');

      // Send notification to user (e.g., via SMS or email)
      await axios.post('http://localhost:8081/notifications/send', {
        phoneNumber,
        message: 'Your waste collection request has been accepted!',
      });

      // Optionally refresh the list or update the request status in the UI
    } catch (error) {
      console.error('Error accepting the request:', error);
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
                    <button onClick={() => handleAccept(request._id, request.PhoneNumber)} className="accept-button">
                      Accept
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
