import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import ProjectPage from './ProjectPage/ProjectPage'
import style from './ActiveProject.module.css'
import Navbar from '../HomePage/Navbar'

const ActiveProject = () => {
  return (
    <>
    <div className={style.con}>
      <div className={style.nav}>
        <Navbar/>
      </div>
      <div className={style.page}>
        <div>
          <Sidebar/>
        </div>
        <div>
          <ProjectPage/>
        </div>
      </div>
    </div>
    </>
  )
}

export default ActiveProject