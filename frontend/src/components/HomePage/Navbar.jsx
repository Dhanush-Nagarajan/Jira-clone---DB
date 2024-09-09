import React from 'react'
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <div>
        <div onClick={()=>{navigate('/create-project')}}>
        <img className="logo" src={logo} alt="logo"/>
        </div>
    </div>
  )
}

export default Navbar