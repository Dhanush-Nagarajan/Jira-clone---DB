import React from 'react'
import logo from '../../assets/logo.png'
import './Login.css'

const Login = () => {
  return (
    <div className='login'>
       <div className='login-container'>
          <div className='logo-con'>
            <img className='img' src={logo} alt="logo"/> <span className='name-logo'>Jira</span>
            <p className='font'>Login to to continue</p>
              <div className='ip-box font'>
                <input  className='input i' type="emai" placeholder='Enter your Email-id' required/> <br />
                <input className='input i' type="password" required placeholder='Enter Password'/> <br />
                <button className='input'>Login</button>
              </div>
            </div>
          <div className='end'>
            <p className='font'><span>Does not Have an account ?</span> <span className='sign-up'>Sign up here!</span></p>
          </div>
       </div>
    </div>
  )
}

export default Login