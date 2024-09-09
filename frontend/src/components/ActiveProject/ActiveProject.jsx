import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import ProjectPage from './ProjectPage/ProjectPage'
import style from './ActiveProject.module.css'
const ActiveProject = () => {
  return (
    <div className={style.page}>
      <Sidebar/>
      <ProjectPage/>
    </div>
  )
}

export default ActiveProject