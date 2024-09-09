import React, { useState } from 'react'
import logo from '../../assets/logo.png';
import styles from './Navbar.module.css'

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

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
            <button className={styles.button}>Create</button>
        </div>
        <div className={styles.search}>
        <input type='search' placeholder='Search'/> 
        </div>
        
        <div className={styles.profile} onClick={toggleDropdown}>
        <img
          className={styles.profileImg}
          src="path/to/profile-img.png"
          alt="User"
        />
        {isDropdownOpen && (
          <div className={styles.profileMenu}>
            <p>Profile</p>
            <p>Logout</p>
          </div>
        )}
      </div>
            
                
        
    </div>
        <hr />
    </>
  )
}

export default Navbar