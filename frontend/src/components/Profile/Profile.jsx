import React from 'react'
import Navbar from '../HomePage/Navbar'
import style from './Profile.module.css'

const Profile = () => {
  return (
    <div>
        <Navbar/>
        <div className={style.nav}>
            <div className={style.free}>

            </div>
            <hr className={style.line} />
            <div>
                user
            </div>
            <div className={style.about}>
                <button className={style.button}>
                    <span>About me</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                     <path d="M1,5 L11,5"></path>
                     <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Profile