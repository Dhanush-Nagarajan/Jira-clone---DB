import React from 'react'
import logo from '../../assets/logo.png'
import './Signup.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='signup'>
       <div className='sign-container'>
          <div className='logo-con'>
            <img className='img' src={logo} alt="logo"/> <span className='name-logo'>Jira</span>
            <p className='font'>sign-up to to continue</p>
              <div className='ip-box font'>
                <input  className='input i' type="text" placeholder='Enter your name' required/> <br />
                <input  className='input i' type="email" placeholder='Enter your email-id' required/> <br />
                <input  className='input i' type="password" placeholder='Enter your password ' required/> <br />
                <input className='input i' type="password" required placeholder='Confirm your password'/> <br />
                <button className='input'>Sign-up</button>
              </div>
            </div>
          <div className='end'>
            <p className='font'><span>Already Have an account ?</span> <span className='loginn'><Link to='/login'>Login now!</Link></span></p>
          </div>
       </div>
    </div>
  )
}

export default Login