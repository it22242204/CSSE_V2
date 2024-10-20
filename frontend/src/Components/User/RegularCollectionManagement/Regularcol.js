import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Order.css';

function Regularcol(props) {
  const { _id, TypeofUser, Name, PhoneNumber, Address, ColletionOption, Amount, status } = props.regularCollection;

  const history = useNavigate();

  // Delete handler
  const deleteHandler = async () => {
    const userconfirm = window.confirm("Are you sure you want to delete this order?");
    if (userconfirm) {
      try {
        await axios.delete(`http://localhost:8080/regularcollection/${_id}`)
          .then(res => res.data)
           .then(() => history("/"))
          .then(() => history("/regularDisplay"));
      } catch (error) {
        console.log("Error in order deleting:", error);
      }
    }
  };

  // Function to determine status display
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Driver Accepted':
        return 'Accepted';
      case 'Denied':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div style={{ alignItems: 'center' }}>
      <div className="card mb-3" id="cards">
        <div className="card-body">
          <h5 className="card-title">Order Display</h5>
          <div style={{ display: 'flex' }} className="details">
            <h5>{Name}</h5>
            <h5>{TypeofUser}</h5>
            <h5>{PhoneNumber}</h5>
            <h5>{Address}</h5>
            <h5>{ColletionOption}</h5>
            <h5>{Amount}</h5>
            
            
            <button
              className="btn btn-success no-print"
              onClick={() => (window.location.href = `/specialorderdetails/${_id}`)}
            >
              Edit
            </button>
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete
            </button>
            <h5>{getStatusDisplay(status)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regularcol;
