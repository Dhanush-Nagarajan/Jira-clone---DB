import React from 'react'
import { AiFillThunderbolt } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { IoShareSocialSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import style from './ProjectPage.module.css'

const ProjectPage = () => {
  return (
    <>
    <div className={style.body}>
      <div>
        Projects / Projects1
      </div>
      <div className={style.sprintcon}>
        <div><h2>All Sprints</h2></div>
        <div className={style.option}>
          <AiFillThunderbolt className={style.icon}/>
          <CiStar className={style.icon}/>
          <IoShareSocialSharp className={style.icon}/>
          <span className={style.bgc}>Complete sprint</span>
          <span className={style.bgc}><HiDotsHorizontal/></span>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProjectPage