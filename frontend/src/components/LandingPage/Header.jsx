import React from 'react'
import logo from '../../assets/logo.png'
import { IoSearch } from "react-icons/io5";
import './Header.css'

const Header = () => {
  return (
    <div className='display'>
      <div>
        <img className='logo' src={logo} alt="logo" />
      </div>
      <div className='name'><h2>Jira</h2></div>
      <div className='features'>
        <p>Features</p>
        <p>Product guide</p>
        <p>Template</p>
        <p>Pricing</p>
        <p>Enterprise</p>
      </div>
      <div className='getbutton'>
        <button className='get'>Get it free</button>
      </div>
      <div>
        <IoSearch className='search'/>
      </div>
      <div>
        <button className='sign'>Sign in</button>
      </div>

    </div>
  )
}

export default Header