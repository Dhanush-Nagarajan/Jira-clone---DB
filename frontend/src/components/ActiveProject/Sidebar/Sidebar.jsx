import React, { useEffect, useState } from 'react'
import { MdOutlinePending } from "react-icons/md"
import { MdOutlineViewTimeline } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import style from './Sidebar.module.css'
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../../../Context/ProjectContext';

const Sidebar = () => {
  const [projectName, setProjectName] = useState('');
  const { projectDetails } = useProjectContext();
  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails.Project_name || "Unnamed Project");
    }
  }, [projectDetails]);

  const navigate=useNavigate();
  return (
    <div className={style.container}>
      <div className={style.name}>
      <div className={style.dp}>{projectName[0]}</div>
        <p>{projectName}</p>
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