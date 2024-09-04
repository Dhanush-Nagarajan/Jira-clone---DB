import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import './Signup.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleSignup = async(e) => {
    e.preventDefault();

    if (input.password !== input.cpassword) {
      console.error("Passwords do not match");
      return; 
    }

      await axios.post('http://localhost:2000/api/auth/signup',{
      fullName:input.fullName,
      email:input.email,
      password:input.password,
      confirmPassword:input.cpassword,
    })
    .then(response=> console.log(response))
    .catch(err => console.log(err))
  };
  return (
    <form onSubmit={handleSignup}>
      <div className='signup'>
        <div className='sign-container'>
          <div className='logo-con'>
            <img className='img' src={logo} alt="logo" /> <span className='name-logo'>Jira</span>
            <p className='font'>Sign-up to continue</p>
            <div className='ip-box font'>
              <input
                value={input.name}
                onChange={(e) => setInput({ ...input, fullName: e.target.value })}
                className='input i'
                type="text"
                placeholder='Enter your name'
                required
              />
              <br />
              <input
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                className='input i'
                type="email"
                placeholder='Enter your email-id'
                required
              />
              <br />
              <input
                value={input.password}
                onChange={(e) => setInput({ ...input, password: e.target.value })}
                className='input i'
                type="password"
                placeholder='Enter your password'
                required
              />
              <br />
              <input
                value={input.cpassword}
                onChange={(e) => setInput({ ...input, cpassword: e.target.value })}
                className='input i'
                type="password"
                placeholder='Confirm your password'
                required
              />
              <br />
              <button type='submit' className='input inputb'>Sign-up</button>
            </div>
          </div>
          <div className='end'>
            <p className='font'><span>Already Have an account?</span> <span className='loginn'><NavLink to='/login'>Login now!</NavLink></span></p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;