import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Body from './Body'

const Home = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token && userData) {
      console.log('Token:', token);
      console.log('User Data:', userData);
    }
  
  }, []);
  
  return (
    <>
    <Navbar/>
    <Body/>
    </>
  )
}

export default Home