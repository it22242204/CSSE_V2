import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
function Footer() {
  return (
    
    <div >
       <footer className="footer">
        <div className ='footer-images'>
            <FaFacebook/>
            <FaInstagram/>
            <FaTwitter/>
        </div>
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms of Service</a>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; 2024 Eco-R</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
