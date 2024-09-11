import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import style from './Backlog.module.css'
import Navbar from '../../HomePage/Navbar'

const Backlog = () => {
  return (
    <>
      <Navbar/>
      <div  className={style.blhead}>
        <div>
          <Sidebar/>
        </div>
        <div className={style.body}>
        <div className={style.head}>
          <h2>Backlog</h2>
        </div> 

        <div > 
          <input className={style.search1}  type='search' placeholder='search'/> 
          <button className={style.user}>D</button>
        </div> 
        <div>
          <button className={style.button}>+ Create issue</button>

          
        </div>

      </div>
      </div>
    </>
  )
}

export default Backlog