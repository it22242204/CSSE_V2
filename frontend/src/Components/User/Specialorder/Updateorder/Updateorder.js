import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AfterNav from '../../Home/NavBar/AfterNav';
import Footer from '../../../Footer/Footer';
import './Updateorder.css';
// import bgImage from "./update.jpeg";

function Updateorder() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  const rate=200;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8080/orders/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.order));
    };
    fetchHandler();
  },[id]);

   //implementing the delete function below delete handler
//  const history=useNavigate();
    
   const deleteHandler=async()=>{
    const userconfirm=window.confirm("Are you sure you want to delete this order?")
    if(userconfirm){
     try{
     await axios.delete(`http://localhost:8080/orders/${id}`)
     .then(res=>res.data)
     .then(()=>history("/"))
     .then(()=>history("/specialorderdetails"))
     }catch(error){
     console.log("Error in note deleting:",error);
     };
   }
     
   }
  

  //implementing the sendrequest function
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8080/orders/${id}`, {
        //module attribute name= form input.name
         //module attribute name=name
      contactname:String(inputs.contactname),
      typeofuser:String(inputs.typeofuser),
      contactemail:String(inputs.contactemail),
      address:String(inputs.address),
      listofitems:String(inputs.listofitems),
      prefereddate:Date(inputs.prefereddate),
      preferedtime:String(inputs.preferedtime),
      totalweight:Number(inputs.totalweight),
      totalamount:Number(inputs.totalamount),
      })
      .then((res) => res.data);
  };

  //implementing a function what should happen when make inputs and submit
   const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    if (name === "totalweight") {
      const totalWeightValue = parseFloat(value);
      const rateValue = parseFloat(rate);
  
      // Check if both values are valid numbers
      if (!isNaN(totalWeightValue) && !isNaN(rateValue)) {
        const totalPrice = rateValue * totalWeightValue;
        setInputs((prevState) => ({
          ...prevState,
          totalamount: totalPrice.toFixed(2), // Keeping 2 decimal places for consistency
        }));
      } else {
        // Handle cases where the inputs are not valid numbers
        setInputs((prevState) => ({
          ...prevState,
          totalamount: '0.00', // Default value or handle accordingly
        }));
      }
    }
  };

   //after where should navigate,url related function
   const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/specialorderdetails'),alert("Order details updated successfully!"));
   };

  return (
    <div>
       <AfterNav/>
       <div className="bg"
      style={{   backgroundColor: 'white',
        backgroundSize: 'cover',
        position: 'sticky',
        top:0
         }}>
      
      <form onSubmit={handleSubmit} className='form'>
        <br></br><br/><br/><br/>
        <div style={{marginTop:'-100px'}}>
      <h1>Shedule A special Waste Collection</h1>
      <div class="mb-3">
    <label for="InputName" class="form-label">Contact Name</label>
    <input type="text" class="form-control" name="contactname" aria-describedby="nameHelp" onChange={handleChange} value={inputs.contactname}/>
    <div id="namehelp" class="form-text">Please remember the name you are able to search by this keyword</div>
  </div>
  <div class="mb-3">
    <label for="Inputusertype" class="form-label">Type Of User</label>
    {/* <textarea  name="contactnumber" class="form-control" onChange={handleChange} value={inputs.contactnumber} required/> */}
    <select className="form-select" name="typeofuser" aria-label="Default select example" onChange={handleChange} value={inputs.typeofuser} required>
                <option value="">Open this select menu</option>
                <option value="Household">Household</option>
                <option value="Business">Business</option>
              </select>
  </div>
  <div class="mb-3">
    <label for="Inputcontactemail" class="form-label">Contact Email</label>
    <input type="text" class="form-control" name="contactemail" onChange={handleChange} value={inputs.contactemail} required/>
  </div>
  <div class="mb-3">
    <label for="Inputaddress" class="form-label">Address</label>
    <input type="text" class="form-control" name="address" onChange={handleChange} value={inputs.address} required/>
  </div>
  <div class="mb-3">
    <label for="Inputlistofitems" class="form-label">List Of Items</label>
    <input type="text" class="form-control" name="listofitems" onChange={handleChange} value={inputs.listofitems} required/>
  </div>
  {/* <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
  <div class="mb-3">
    <label for="Inputprefereddate" class="form-label">Prefered Date</label>
    <input type="date" class="form-control" name="prefereddate" onChange={handleChange} value={inputs.prefereddate} required/>
  </div>
  <div class="mb-3">
    <label for="Inputpreferedtime" class="form-label">Prefered Time</label>
    <input type="text" class="form-control" name="preferedtime" onChange={handleChange} value={inputs.preferedtime} required/>
  </div>
  <div class="mb-3">
    <label for="Inputfortotalweight" class="form-label">Total Weight (kg)</label>
    <input type="text" class="form-control" name="totalweight" onChange={handleChange} value={inputs.totalweight} required/>
  </div>
  <div class="mb-3">
    <label for="Inputfortotalamount" class="form-label">Total Amount (RS)</label>
    <input type="text" class="form-control" name="totalamount" onChange={handleChange} value={inputs.totalamount} required/>
  </div>
  <div style={{display:'flex'}}>
  <button type="submit" class="btn btn-danger" onClick={deleteHandler}>Delete</button>
  <button type="submit" class="btn btn-success" style={{marginLeft:'550px'}}>Update</button>
  </div>
  </div>
</form>

</div>

    </div>
  );
}

export default Updateorder;
