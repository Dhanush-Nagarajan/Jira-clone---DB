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
        
        <div className={styles.dropdown}>
          <button className={styles.dropbutton}>USER</button>
          <div className={styles.dropcontent}>
          
            <a href='profile'>profile</a>
            <a href='logout'>logout</a>
            
          </div>
        </div>
            
                
        
    </div>
        
        
        <hr />
    </>
  )
}

export default Navbar