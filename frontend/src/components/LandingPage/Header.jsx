import React from 'react';
import jiralogo from '../../assets/jiralogo.png';
import { IoSearch } from "react-icons/io5";
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  return (
    <>    
      <div className="header">
        <div className='start'>
          <img className="logo" src={jiralogo} alt="logo" />
          <h2 className="name">Jira</h2>
        </div>

        <div className="features">
          <p>Product</p>
          <p>Template</p>
          <p>Pricing</p>
          <p>Enterprise</p>
          <p>Features</p>
        </div>

        <div className='end'>
          <button className="get getbutton">Get it free</button>
          <IoSearch className="search" />
          <button onClick={()=>navigate('/signup')} className="sign">Sign up</button> 
          <button onClick={()=>navigate('/login')} className="sign">Login</button>
        </div>
      </div>
    </>
  );
}

export default Header;
