import React from 'react';
import Nav from '../Nav/Nav';
import './Home.css';
import homebg from "./home.jpg";

function Home() {
  return (
    <div>
      <Nav/>
      <div className='bgimg'>
        <img src={homebg} alt="logo_nav" className="imgbg" /> 
      </div>
      
      
    </div>
  );
}

export default Home;
