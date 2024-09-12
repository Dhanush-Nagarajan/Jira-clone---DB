import React, { useState } from 'react';
import { AiFillThunderbolt } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { IoShareSocialSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import style from './ProjectPage.module.css';
import AddPeopleModal from './Modal/AddPeopleModal';

const ProjectPage = () => {
  const [addPeople,setAddPeople] = useState(false)

  const toggleModal=()=>{
    setAddPeople(true)
  }
  return (
    <>
      <div className={style.body}>
        <div>
          Projects / Projects1
        </div>

        <div className={style.sprintcon}>
          <div>
            <h2>All Sprints</h2>
          </div>
          <div className={style.option}>
            <AiFillThunderbolt className={style.icon} />
            <CiStar className={style.icon} />
            <IoShareSocialSharp className={style.icon} />
            <span className={style.bgc}>Complete sprint</span>
            <span className={style.bgc}><HiDotsHorizontal /></span>
          </div>
        </div>

        <div>
          <div className={style.workcon}>
            <input type="search" placeholder='Search' className={style.input} />
              <div className={style.ucon}>
                    <div className={style.usname}>M</div>
                    <div className={style.usname}>M</div>
                    <div title='Add user' className={style.usname} onClick={toggleModal}><TiUserAdd/></div>
                    {addPeople && <AddPeopleModal close={setAddPeople}/>}
              </div>
              <div className={style.sprint}>
                <p title='sprint'>Sprint <FaCaretDown/></p>
              </div>
          </div>
        </div>

        <div className={style.todocon}>
          <div className={style.todobox}>
            <p className={style.flow}>TO DO</p>
            <div className={style.taskbox}  draggable>
              <div className={style.inner}><p>login</p> <HiDotsHorizontal /></div>
              <div className={style.inner}><p>PRJ-1</p> 
              <div className={style.usname}>M</div></div>
            </div>

            <div className={style.taskbox}>
              <div className={style.inner}><p>login</p> <HiDotsHorizontal /></div>
              <div className={style.inner}><p>PRJ-1</p> 
              <div className={style.usname}>M</div></div>
            </div>
            
            
          </div>
          <div droppable={true.toString()} className={style.todobox}>
            <p className={style.flow}>IN PROGRESS</p>
          </div>
          <div className={style.todobox}>
            <p className={style.flow}>DONE <MdOutlineDone/></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
