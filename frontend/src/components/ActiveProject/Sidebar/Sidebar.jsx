import React from 'react'
import { MdOutlinePending } from "react-icons/md"
import { MdOutlineViewTimeline } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import style from './Sidebar.module.css'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate=useNavigate();
  return (
    <div className={style.container}>
      <div className={style.name}>
      <div className={style.dp}>P</div>
        <p>Project1</p>
      </div>
      <div className={style.plan}>
        <p className={style.ph}>Planning</p>
        <p className={style.p}><MdOutlineViewTimeline className={style.icon}/> Timeline</p>
        <p className={style.p} onClick={()=>navigate('/backlog')}><MdOutlinePending className={style.icon}/> Backlog</p>
        <p className={style.p} onClick={()=>navigate('/project')}><MdDashboard className={style.icon}/> Board</p>
      </div>
    </div>
  )
}

export default Sidebar