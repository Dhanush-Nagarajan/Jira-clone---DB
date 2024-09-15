import React, { useState } from 'react'
import { IoShareSocialSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { FaCaretDown } from "react-icons/fa";
import Sidebar from '../Sidebar/Sidebar'
import style from './Backlog.module.css'
import Navbar from '../../HomePage/Navbar'
import AddPeopleModal from '../ProjectPage/Modal/AddPeopleModal.jsx';



const Backlog = () => {
  const [addPeople, setAddPeople] = useState(false);

  const toggleModal = () => {
    setAddPeople(true);
  };
  return (
    <>
      <Navbar/>
      <div  className={style.blhead}>
        <div>
          <Sidebar/>
        </div>
        <div className={style.title}>
          <div>
          Project/Project1
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
        <div className={style.search} > 
          <input className={style.search1}  type='search' placeholder='Search'/> 
          <button className={style.user}>D</button>
          <button className={style.user}>M</button>
          <div title='Add user' className={style.usname} onClick={toggleModal}><TiUserAdd/></div>
          {addPeople && <AddPeopleModal close={setAddPeople} />}
        </div>

        <div className={style.down}>
          <p className={style.down1}>Backlog <FaCaretDown/>  </p>
          <span className={style.create}>Create sprint</span>
        </div> 

        

        

        <div className={style.text}>
          <p className={style.empty}>Your backlog is empty</p>
        </div>
       
        <div>
          <button className={style.button}>+ Create issue </button>

          
        </div>

        
        </div>
      </div>
    </>
  )
}

export default Backlog