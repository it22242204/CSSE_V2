import React, { useState } from 'react';
import Sidebar from '../DriverDashBord/SideBar/Sidebar';
import './drivernotifi.css'
const DriverNotification = () => {
  // Setting fake user details directly in the state
  const [assignedRequests] = useState([
    {
      _id: "fake123", 
      TypeofUser: "BusinessUser", 
      Name: "Sunil", 
      PhoneNumber: "774556120", 
      Address: "warakapola", 
      ColletionOption: "Monthly", 
      Amount: "5000"
    },
    {
      _id: "fake123", 
      TypeofUser: "BusinessUser", 
      Name: "shabry", 
      PhoneNumber: "0766440967", 
      Address: "kandy", 
      ColletionOption: "daily", 
      Amount: "2000"
    },
    {
      _id: "fake123", 
      TypeofUser: "BusinessUser", 
      Name: "Sliit", 
      PhoneNumber: "0112345678", 
      Address: "Malabe", 
      ColletionOption: "daily", 
      Amount: "2000"
    }
  ]);
  const [loading] = useState(false); // No need to load since we're using fake data

  return (
    <div>
      <Sidebar />
      <div className="driver-notification-container">
        <h2 className='driver_noti_h2'>Assigned Collection Requests</h2>
        {loading ? (
          <p className='driver_noti_p'> Loading assigned requests...</p>
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
          <p className='driver_noti_p'>No assigned collection requests available.</p>
        )}
      </div>
    </div>
  );
};

export default DriverNotification;
