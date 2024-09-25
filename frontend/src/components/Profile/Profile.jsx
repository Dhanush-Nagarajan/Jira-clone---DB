import React from 'react';
import Navbar from '../HomePage/Navbar';
import style from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const userData = JSON.parse(localStorage.getItem('user'));
  console.log(userData);
  const navigate = useNavigate();

  const formatFullName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div>
      <Navbar />
      <div className={style.profileContainer}>
        {/* Profile Header */}
        <div className={style.header}>
          <h2>User Profile</h2>
        </div>
        
        <hr className={style.line} />
        
        {/* User Info */}
        <div className={style.userInfo}>
          <h3 className={style.name}>Name : {formatFullName(userData.fullName)}</h3>
          <p className={style.email}>Email : {userData.email}</p>
        </div>

        {/* View All Projects Button */}
        <div className={style.projectsSection}>
          <button className={style.projectsButton} onClick={()=>navigate('/project-list')}>
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
