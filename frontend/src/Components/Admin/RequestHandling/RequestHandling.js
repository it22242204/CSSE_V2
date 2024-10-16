import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestHandling.css';
import Sidebar from '../AdminDashBord/SideBar/Sidebar';

const RequestHandling = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch registered user data from backend
   const fetchRequests = async () => {
  try {
    const response = await axios.get("http://localhost:8080/regularcollection");

    // Log response to ensure it is correct
    console.log('Fetched Requests:', response.data);

    // Access the correct field 'regularCollections'
    const data = Array.isArray(response.data.regularCollections) ? response.data.regularCollections : [];
    setRequests(data);
  } catch (error) {
    console.error('Error fetching the requests:', error);
  }
};

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8080/regularcollection/${id}/accept`);
      alert('Request Accepted!');
      // Optionally refresh the list or update the request status in the UI
    } catch (error) {
      console.error('Error accepting the request:', error);
    }
  };

  const handleAssignDriver = async (id) => {
    try {
      await axios.put(`http://localhost:8080/regularcollection/${id}/assign-driver`);
      alert('Driver Assigned!');
      // Optionally refresh the list or update the request status in the UI
    } catch (error) {
      console.error('Error assigning the driver:', error);
    }
  };

  return (
    <div>
        <Sidebar/>
      <div className="request-table-container">
        <h2> Regular Collection Requests</h2>
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
                    <button onClick={() => handleAccept(request._id)} className="accept-button">
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
