import React, { useState, useEffect } from 'react';
import { IoShareSocialSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { FaCaretDown } from "react-icons/fa";
import Sidebar from '../Sidebar/Sidebar';
import style from './Backlog.module.css';
import Navbar from '../../HomePage/Navbar';
import AddPeopleModal from '../ProjectPage/Modal/AddPeopleModal.jsx';
import CreateSprintModal from '../ProjectPage/Modal/CreateSprintModal.jsx';
import { useProjectContext } from '../../../Context/ProjectContext';

const Backlog = () => {
  const [addPeople, setAddPeople] = useState(false);
  const [createSprint, setCreateSprint] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { projectDetails } = useProjectContext();

  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails.Project_name || "Unnamed Project");
    }
  }, [projectDetails]);

  const toggleModal = () => {
    setAddPeople(prev => !prev);
  };

  const toggleCreateModal = () => {
    setCreateSprint(prev => !prev);
  };

  return (
    <>
      <Navbar />
      <div className={style.blhead}>
        <Sidebar />
        <div className={style.title}>
          <div className='projectname'>
            Project / {projectName}
          </div>
          <div className={style.body}>
            <div className={style.head}>
              <h2>Backlog</h2>
            </div> 
            <div className={style.options}>            
              <IoShareSocialSharp className={style.icon} />
              <span className={style.bgc}><HiDotsHorizontal /></span>
            </div>
          </div>
          <div className={style.search}> 
            <input className={style.search1} type='search' placeholder='Search'/> 
            <button className={style.user}>D</button>
            <button className={style.user}>M</button>
            <div title='Add user' className={style.usname} onClick={toggleModal}>
              <TiUserAdd />
            </div>
            {addPeople && <AddPeopleModal close={setAddPeople} />}
          </div>

          <div className={style.down}>
            <p className={style.down1}>Backlog <FaCaretDown/>  </p>
            <span className={style.create} onClick={toggleCreateModal}>
              Create sprint
            </span>
            {createSprint && <CreateSprintModal close={setCreateSprint} />}
          </div> 

          <div className={style.text}>
            <p className={style.empty}>Your backlog is empty</p>
          </div>

          <div>
            <button className={style.button}>+ Create issue</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Backlog;
