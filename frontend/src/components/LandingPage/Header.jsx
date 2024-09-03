import React from 'react';
import logo from '../../assets/logo.png';
import { IoSearch } from "react-icons/io5";
import './Header.css';

const Header = () => {
  return (
    <>    
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <h2 className="name">Jira</h2>
        <div className="features">
          <p className="featuresp">Features</p>
          <p className="featuresp">Product</p>
          <p className="featuresp">Template</p>
          <p className="featuresp">Pricing</p>
          <p className="featuresp">Enterprise</p>
        </div>
        <div className="getbutton">
          <button className="get">Get it free</button>
        </div>
        <div>
          <IoSearch className="search" />
        </div>
        <div>
          <button className="sign">Sign in</button>
        </div>
      </div>
    </>
  );
}

export default Header;
