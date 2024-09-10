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

        <div>
          <h2>Backlog</h2>
        </div>
      </div>
    </>
  )
}

export default Backlog