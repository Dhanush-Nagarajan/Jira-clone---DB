import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token and user data from localStorage
    const token = localStorage.getItem('token');
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    setUserData(storedUserData);
  }, []);

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
          <img className="logo" src={logo} alt="logo" />
          <h2>JIRA</h2>
        </div>

        <div className={styles.features1}>
          <p>Your works</p>
          <p>Projects</p>
        </div>
        
        <div>
          <button className={styles.button} onClick={() => navigate('/create-project')}>Create</button>
        </div>

        <div className={styles.search}>
          <input className={styles.search1} type='search' placeholder='Search' />
        </div>

        <div className={styles.dropdown}>
          <button className={styles.dropbutton} onClick={toggleDropdown}>
            {userData ? userData.fullName[0].toUpperCase() : 'User'}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropcontent}>
              <p>Profile</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>    
      </div>

      <hr />
    </>
  );
};

export default Navbar;
