import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DriverLogin.css';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // This is the phone number in the database
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch all drivers from the database
      const res = await axios.get('http://localhost:8081/drive');
      const drivers = res.data.driv;

      // Find the driver with the entered email
      const driver = drivers.find((drv) => drv.gmail === email);

      if (!driver) {
        setError('Driver not found');
        return;
      }

      // Check if the entered password matches the driver's phone number
      if (driver.phone !== password) {
        setError('Incorrect password');
        return;
      }

      // If email and password match, navigate to the driver dashboard
      navigate('/DriverDash');  // or any other path you want to redirect to

    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  return (
    <div className="driver-login-container">
      <h2 className='driver_h2'>Driver Login</h2>
      {error && <p className="driver_error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="driver_form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="driver_form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button className='driver_button' type="submit">Login</button>
      </form>
    </div>
  );
};

export default DriverLogin;
