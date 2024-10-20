import React, { useState } from 'react';
import './Addorder.css';
import axios from 'axios';
import AfterNav from '../../Home/NavBar/AfterNav';
import Footer from '../../../Footer/Footer';
import Bin from './bin.png';
import SpecialCollectionPayment from '../../SpecialCollection/SpecialCollectionPayment'; // Import the payment modal

function Addorder() {
  const rate = 200;
  const [inputs, setInputs] = useState({
    contactname: "",
    typeofuser: "",
    contactemail: "",
    address: "",
    listofitems: "",
    prefereddate: "",
    preferedtime: "",
    totalweight: "",
    totalamount: "",
    status: "Pending"
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false); // State to control modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "totalweight") {
      const totalWeightValue = parseFloat(value);
      const rateValue = parseFloat(rate);
      if (!isNaN(totalWeightValue) && !isNaN(rateValue)) {
        const totalPrice = rateValue * totalWeightValue;
        setInputs((prevState) => ({
          ...prevState,
          totalamount: totalPrice.toFixed(2),
        }));
      } else {
        setInputs((prevState) => ({
          ...prevState,
          totalamount: '0.00',
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      setShowPaymentModal(true); // Open the payment modal
    });
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8080/orders", {
      contactname: String(inputs.contactname),
      typeofuser: String(inputs.typeofuser),
      contactemail: String(inputs.contactemail),
      address: String(inputs.address),
      listofitems: String(inputs.listofitems),
      prefereddate: Date(inputs.prefereddate),
      preferedtime: String(inputs.preferedtime),
      totalweight: Number(inputs.totalweight),
      totalamount: Number(inputs.totalamount),
      status: "Pending"
    }).then(res => res.data);
  };

  return (
    <div>
      <AfterNav/>
      <div className='' style={{ display: 'flex', gap: '30px' }}>
        <div className="bg" style={{ backgroundColor: 'white', backgroundSize: 'cover', position: 'sticky', top: 0 }}>
          <form onSubmit={handleSubmit} className='form'>
            <br /><br /><br /><br />
            <div className='cont2'>
              <h1>Schedule A Special Waste Collection</h1>
              <div className="mb-3">
                <label htmlFor="InputName" className="form-label">Contact Name</label>
                <input type="text" className="form-control" name="contactname" aria-describedby="nameHelp" onChange={handleChange} value={inputs.contactname} />
                <div id="namehelp" className="form-text">Please remember the name you are able to search by this keyword</div>
              </div>
              <div className="mb-3">
                <label htmlFor="Inputusertype" className="form-label">Type Of User</label>
                <select className="form-select" name="typeofuser" onChange={handleChange} value={inputs.typeofuser} required>
                  <option value="">Open this select menu</option>
                  <option value="Household">Household</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Inputcontactemail" className="form-label">Contact Email</label>
                <input type="text" className="form-control" name="contactemail" onChange={handleChange} value={inputs.contactemail} required />
              </div>
              <div className="mb-3">
                <label htmlFor="Inputaddress" className="form-label">Address</label>
                <input type="text" className="form-control" name="address" onChange={handleChange} value={inputs.address} required />
              </div>
              <div className="mb-3">
                <label htmlFor="Inputlistofitems" className="form-label">List Of Items</label>
                <input type="text" className="form-control" name="listofitems" onChange={handleChange} value={inputs.listofitems} required />
              </div>
              <div className="mb-3">
                <label htmlFor="Inputprefereddate" className="form-label">Preferred Date</label>
                <input type="date" className="form-control" name="prefereddate" onChange={handleChange} value={inputs.prefereddate} required />
              </div>
              <div className="mb-3">
                <label htmlFor="Inputpreferedtime" className="form-label">Preferred Time</label>
                <input type="time" className="form-control" name="preferedtime" onChange={handleChange} value={inputs.preferedtime} required />
              </div>
              <div className="mb-3">
                <label htmlFor="Inputfortotalweight" className="form-label">Total Weight (kg)</label>
                <input type="text" className="form-control" name="totalweight" onChange={handleChange} value={inputs.totalweight} required />
              </div>
              <div className="mb-3">
                <label htmlFor="Inputfortotalamount" className="form-label">Total Amount (RS)</label>
                <input type="text" className="form-control" name="totalamount" onChange={handleChange} value={inputs.totalamount} required />
              </div>
              <div className='btngroup'>
                <button type="button" className="btn btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-success" style={{ marginLeft: '550px' }}>Pay</button>
              </div>
            </div>
          </form>
        </div>
        <div className='bin'>
          <img src={Bin} alt="logo_nav" className="binimg" />
        </div>
      </div>
      <Footer/>

      {/* Modal Popup for SpecialCollectionPayment */}
      {showPaymentModal && (
        <SpecialCollectionPayment
          contactname={inputs.contactname}
          totalamount={inputs.totalamount}
          closeModal={() => setShowPaymentModal(false)} // Close modal when payment is done or cancelled
        />
      )}
    </div>
  );
}

export default Addorder;