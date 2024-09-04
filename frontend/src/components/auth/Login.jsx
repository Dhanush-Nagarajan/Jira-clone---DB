import React from 'react'
import logo from '../../assets/logo.png'
import './Login.css'

const Login = () => {
  return (
    <div className='login'>
      <div className='login-container'>
          <img className='img' src={logo} alt="logo"/> 
          <h1>Jira</h1>
          <p>Login to to continue</p>
          <input type="emai" required/> <br />
          <input type="password" required/> <br />
          <button>Login</button>
          <p><span>Does not Have an account ?</span> <span>Sign up here!</span></p>
       </div>
    </div>
  )
}

export default Login