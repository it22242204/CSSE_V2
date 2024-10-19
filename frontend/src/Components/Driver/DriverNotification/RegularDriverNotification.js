import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../DriverDashBord/SideBar/Sidebar';

const DriverNotification = () => {
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to fetch assigned collection requests for the driver
    const fetchAssignedRequests = async () => {
      try {
        setLoading(true);
        // Fetch the collection requests assigned to the driver
        const response = await axios.get('http://localhost:8080/assigned-requests'); 
        setAssignedRequests(response.data.assignedRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assigned requests:', error);
        setLoading(false);
      }
    };

    fetchAssignedRequests();
  }, []);
  

  return (
    <div>
      <Sidebar />
      <div className="driver-notification-container">
        <h2>Assigned Collection Requests</h2>
        {loading ? (
          <p>Loading assigned requests...</p>
        ) : assignedRequests.length > 0 ? (
          <table className="assigned-request-table">
            <thead>
              <tr>
                <th>Type of User</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Collection Option</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {assignedRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.TypeofUser}</td>
                  <td>{request.Name}</td>
                  <td>{request.PhoneNumber}</td>
                  <td>{request.Address}</td>
                  <td>{request.ColletionOption}</td>
                  <td>{request.Amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No assigned collection requests available.</p>
        )}
      </div>
    </div>
  );
};

export default DriverNotification;
