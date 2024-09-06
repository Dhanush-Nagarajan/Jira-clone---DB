import React from 'react';
import logo from '../../assets/logo.png';
import { IoSearch } from "react-icons/io5";
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  return (
    <>    
      <div className="header">
        <div className='start'>
          <img className="logo" src={logo} alt="logo" />
          <h2 className="name">Jira</h2>
        </div>

        <div className="features">
          <p className="featuresp">Features</p>
          <p className="featuresp">Product</p>
          <p className="featuresp">Template</p>
          <p className="featuresp">Pricing</p>
          <p className="featuresp">Enterprise</p>
        </div>

        <div className='end'>
          <button className="get getbutton">Get it free</button>
          <IoSearch className="search" />
          <button onClick={()=>navigate('/signup')} className="sign">Sign in</button>
        </div>
      </div>
    </>
  );
}

export default Header;
