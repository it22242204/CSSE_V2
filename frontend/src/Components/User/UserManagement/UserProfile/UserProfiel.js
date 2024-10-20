import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../User.css";
import AfterNav from "../../Home/NavBar/AfterNav";
import Footer from "../../../Footer/Footer";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [showRequests, setShowRequests] = useState(false); // State to control visibility of requests
  const history = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post("http://localhost:8080/profile", { token });
        if (response.data.status === "ok") {
          setUser(response.data.user); // Set user data
          localStorage.setItem("userEmail", response.data.user.email);
          localStorage.setItem("userAddress", response.data.user.address);
          fetchData(response.data.user.email); // Fetch payment details with user email
        } else {
          console.error("Error retrieving user details:", response.data.data);
        }
      } catch (error) {
        console.error("Error retrieving user details:", error.message);
      } finally {
        setLoading(false);
      }
    }

    const fetchData = async (userEmail) => {
      try {
        const response = await axios.get('http://localhost:8080/api/payment/');
        console.log(response.data); 

        if (Array.isArray(response.data)) {
          // Filter payments by matching user email
          const userPayments = response.data.filter(payment => payment.email === userEmail);
          setPaymentDetails(userPayments); // Set filtered payment details
        } else {
          console.error('Unexpected structure:', response.data);
          alert('Unexpected response structure. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch payment details. Please try again later.');
      }
    };

    fetchUserDetails();
  }, []);

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/user/${user._id}`);
        window.alert("Account details deleted successfully!");
        history("/");
        window.location.reload(); // Reload the page
      } catch (error) {
        console.error("Error deleting account details:", error);
      }
    }
  };

  // Function to toggle the visibility of recycle service requests
  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  return (
    <div>
      <AfterNav />
      <br /> <br />
      <div>
        <h1 className="login-topic">
          Welcome Back {user ? user.name : ""}
        </h1>
        <br />
        <div className="user_profile">
          <div>
            {loading ? (
              <p>Loading user details...</p>
            ) : user ? (
              <div>
                <h3 className="profile_item">Name: {user.name}</h3>
                <h3 className="profile_item">Gmail: {user.email}</h3>
                <h3 className="profile_item">Address: {user.address}</h3>
                <h3 className="profile_item">Phone: {user.phone}</h3>
              </div>
            ) : (
              <p>User data not found.</p>
            )}

            <div className="btn_con">
              {user && (
                <Link className="btn_dash_admin" to={`/updateaccount/${user._id}`}>
                  Update
                </Link>
              )}
              <button onClick={deleteHandler} className="btn_dash_admin_dlt">
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <div className="btn_container">
          <button onClick={toggleRequests} className="btn_dash_admin_ash">
            {showRequests ? "Hide your Recycle Service Requests" : "View your Recycle Service Requests"}
          </button>
          
          {showRequests && (
            <>
              <h2>Recycle Service Requests</h2>
              {paymentDetails.length > 0 ? (
                <ul>
                  {paymentDetails.map((payment) => (
                    <li key={payment._id}>
                      <h4>Waste Details:</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price/Kg</th>
                            <th>Weight</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment.wasteDetails.map((waste, index) => (
                            <tr key={index}>
                              <td>{waste.name}</td>
                              <td>Rs {waste.pricePerKg}</td>
                              <td>{waste.quantity}</td>
                              <td>Rs {waste.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <h5 className="subtotal">Subtotal: Rs {payment.subtotal}</h5>
                      <h5>Payment Method: {payment.paymentMethod}</h5>
                      <h4>Status: {payment.status}</h4>
                      <br />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recycle service requests found.</p>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;