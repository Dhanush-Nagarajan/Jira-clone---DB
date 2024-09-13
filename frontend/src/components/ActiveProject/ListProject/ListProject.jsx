import React from 'react'
import Navbar from '../../HomePage/Navbar';
import style from './ListProject.module.css'
import { HiDotsHorizontal } from "react-icons/hi";

const ListProject = () => {
  return (
    <div className={style.con}>
      <div className={style.nav}>
        <Navbar/>
      </div>

      <div className={style.body}>
        <div className={style.topcon}>
            <h2>Projects</h2>
          <div>
            <button className={style.createButton}>Create Project</button>
          </div>
        </div>

        <div>
          <input type="text" placeholder='Search projects..' className={style.ip}/>
        </div>

        <div className={style.procon}>
          <div className={style.prohead}> 
            <p className={style.tableb}>Name</p>
            <p className={style.tableb}>Key</p>
            <p className={style.tableb}>Lead</p>
            <p className={style.tableb}>More Actions</p>
          </div>
          <hr />

          <div className={style.tablebcon}>
          <div className={style.probody}>
            <p className={style.tablebo} >GOAT</p>
            <p className={style.tableb}>GOT</p>
            <p className={style.tablebo}>ABC</p>
            <div>
            <HiDotsHorizontal className={style.tableb}/>
            </div>
          </div>
          <hr />
          </div>

        </div>
      </div>
    
    </div>
  )
}

export default ListProject