import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import ProjectPage from './ProjectPage/ProjectPage'
import style from './ActiveProject.module.css'
import Navbar from '../HomePage/Navbar'

const ActiveProject = () => {
  return (
    <>
      <Navbar/>
    <div className={style.page}>
      <Sidebar/>
      <ProjectPage/>
    </div>
    </>
  )
}

export default ActiveProject