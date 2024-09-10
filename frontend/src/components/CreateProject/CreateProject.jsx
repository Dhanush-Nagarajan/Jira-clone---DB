import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import style from './CreateProject.module.css'
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate =useNavigate();
  const handleCreate = (e) =>{
    e.preventDefault();
    navigate('/project')
  }
  return (
    <>
    <form onSubmit={handleCreate}>
    <div className={style.header}>
    <div className={style.head}> <div className={style.inner}><FaArrowLeft className={style.icon} onClick={()=>navigate('/home')}/><span className={style.icon} onClick={()=>navigate('/home')}>Back to Home</span></div></div>
    <div className={style.body}>
      <div className={style.innerbody}>
      <h1>Add Project Details</h1>
      <p className={style.p}>Explore what's possible when you collaborate with your team. <br /> Edit project details anytime in project settings.</p>
      <div className={style.projectdetails}>
        <label className={style.p}>Project Name</label><input className={style.ip} type='text' placeholder='Project Name' />
        <br />
        <label for="access" className={style.p}>Access<br /></label>
          <select name="access" id="access" className={style.ip} >
            <option className={style.ip} value="Private">Private</option>
            <option className={style.ip} value="Limited">Limited</option>
            <option className={style.ip} value="Open">Open</option>
          </select>
          <br />
          <label className={style.p}>Key</label> <input type="text" className={style.ip}  />
          </div>
          <div className={style.buttondiv}>
          <button className={style.button1}>Cancel</button> <button type='submit' className={style.button2}>Next</button>
          </div>
      </div>
    </div>
    </div>
    </form>
    </>
  )
}

export default CreateProject