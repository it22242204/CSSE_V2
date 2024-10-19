import React from 'react';
import './AboutUs.css';
import aboutus from "./img/aboutus.jpg";
import BeforNav from './NavBar/BeforNav';
import Footer from '../../Footer/Footer';

const AboutUs = () => {
  return (
    <div>
      <BeforNav />
      <div className="about-us-container">
        <section className="about-us-content">
          <div className="text-content">
            <h2>About Us</h2>
            <p>
              At Smart Garbage Management System for Urban Areas, we are committed to transforming traditional waste management practices by introducing innovative, sustainable, and tech-driven solutions. Our platform was designed to address the inefficiencies of hand-operated garbage collection methods that are still prevalent in many regions, including Sri Lanka. By incorporating smart technology, we aim to optimize waste collection, reduce operating costs, and promote recycling, benefiting both the environment and the community.
            </p>
            <p>
              Our system goes beyond routine waste collection by enabling users to request special garbage collections and facilitating the recycling process. We manage the entire waste lifecycle, from collection to recycling and the sale of recycled products. This closed-loop approach contributes to a cleaner and more sustainable future.
            </p>
            <h3>Our Vision</h3>
            <p>
              We envision a world where waste is efficiently managed, resources are conserved, and communities thrive in cleaner urban environments. Through our recycling initiatives and smart waste management systems, we are creating a circular economy that turns waste into opportunity.
            </p>
            
            <h3>Our Commitment</h3>
            <p>
              We are dedicated to providing an efficient, user-friendly, and sustainable garbage management solution. We believe in the importance of reducing waste, recycling materials, and using smart systems to improve the quality of life in urban areas. By actively involving households, businesses, and local authorities, we are working towards building cleaner, greener communities.
            </p>
            <p>
              Join us on our mission to revolutionize urban waste management and make a lasting impact on our environment!
            </p>
            {/* <button className="contact-btn">Contact Us</button> */}
          </div>
          <div className="image-content">
            <img src={aboutus} alt="About Us Illustration" />
            <h3>Our Services</h3>
            <p>
              Our platform serves multiple stakeholders, each with tailored functionalities:
            </p>
            <ul>
              <li><strong>Guest Users:</strong> Explore our system’s features, get answers to your queries, and raise support tickets if you need assistance.</li>
              <li><strong>Residents:</strong> Registered household and business users can view their garbage collection schedules, request special waste pickups, and participate in recycling programs. They can also purchase eco-friendly recycled products directly from our system.</li>
              <li><strong>Drivers:</strong> Our drivers have a dedicated interface to access their collection schedules, update payment information, and deliver recycled products, ensuring smooth operations on the ground.</li>
              <li><strong>Admin:</strong> The admin team manages the system's operations, from overseeing waste collection and recycling processes to handling payments and addressing user concerns.</li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
