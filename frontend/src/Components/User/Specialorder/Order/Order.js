import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Order.css';

function Order(props) {
  const { _id, contactname, typeofuser, contactemail, address, listofitems, prefereddate, preferedtime, totalweight, totalamount, status } = props.order;

  const history = useNavigate();

  // Delete handler
  const deleteHandler = async () => {
    const userconfirm = window.confirm("Are you sure you want to delete this order?");
    if (userconfirm) {
      try {
        await axios.delete(`http://localhost:5000/orders/${_id}`)
          .then(res => res.data)
          .then(() => history("/"))
          .then(() => history("/specialorderdetails"));
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
            <h5>{formatDate(prefereddate)}</h5>
            <h5>{contactname}</h5>
            <h5>{typeofuser}</h5>
            <h5>{contactemail}</h5>
            <h5>{address}</h5>
            <h5>{listofitems}</h5>
            <h5>{preferedtime}</h5>
            <h5>{totalweight}</h5>
            <h5>{totalamount}</h5>
            
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

export default Order;
