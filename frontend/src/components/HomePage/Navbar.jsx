import React, { useEffect, useState, useRef } from 'react';
import jiralogo from '../../../src/assets/jiralogo.png';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  // Reference for dropdown content
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    setUserData(storedUserData);
    if (token && userData) {
      console.log('Token:', token);
      console.log('User Data:', userData);
    }
  }, []);

  // Function to handle outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick); // Add listener when dropdown is open
    } else {
      document.removeEventListener('mousedown', handleOutsideClick); // Remove listener when dropdown is closed
    }

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:2000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        console.error('Failed to logout:', response.data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className={styles.header1}>
        <div className={styles.start1}>
          <img className={styles.logo} src={jiralogo} alt="logo" onClick={() => navigate('/home')} />
          <h2 onClick={() => navigate('/home')}>JIRA</h2>
        </div>

        <div className={styles.features1}>
          <p>Your works</p>
          <p onClick={() => navigate('/project-list')}>Projects</p>
        </div>

        <div>
          <button className={styles.button} onClick={() => navigate('/create-project')}>Create</button>
        </div>

        <div className={styles.search}>
          <input className={styles.search1} type="search" placeholder="Search" />
        </div>

        <div className={styles.dropdown} ref={dropdownRef}>
          <button className={styles.dropbutton} onClick={toggleDropdown}>
            {userData ? userData.fullName[0].toUpperCase() : 'User'}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropcontent}>
              <p onClick={() => navigate('/profile')}>Profile</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
