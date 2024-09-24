import React, { useState, useEffect } from 'react';
import { AiFillThunderbolt } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { IoShareSocialSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import style from './ProjectPage.module.css';
import AddPeopleModal from './Modal/AddPeopleModal';
import IssueModal from './Modal/IssueModal';
import Navbar from '../../HomePage/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { useProjectContext } from '../../../Context/ProjectContext';

const ProjectPage = () => {
  const [addPeople, setAddPeople] = useState(false);
  const [issueModal, setIssueModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [projectName, setProjectName] = useState('Sample Project');
  
  // Static tasks data for "To Do", "In Progress", and "Done" columns
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', taskId: 'T001', assignee: 'John', status: 'TODO' },
    { id: 2, title: 'Task 2', taskId: 'T002', assignee: 'Alice', status: 'TODO' },
    { id: 3, title: 'Task 3', taskId: 'T003', assignee: 'Bob', status: 'IN PROGRESS' },
    { id: 4, title: 'Task 4', taskId: 'T004', assignee: 'Sara', status: 'IN PROGRESS' },
    { id: 5, title: 'Task 5', taskId: 'T005', assignee: 'Tom', status: 'DONE' },
    { id: 6, title: 'Task 6', taskId: 'T006', assignee: 'Lily', status: 'DONE' },
  ]);

  const { projectDetails, loading, error } = useProjectContext();
  console.log(projectDetails)

  useEffect(() => {
    if (projectDetails) {
      console.log(projectDetails);
      setProjectName(projectDetails.Project_name || "Unnamed Project");
      setTasks(projectDetails.tasks || tasks);
    }
  }, [projectDetails]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleModal = () => {
    setAddPeople(true);
  };

  const toggleIssueModal = () => {
    setIssueModal(true);
  };

  const filterTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = (newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTaskId ? { ...task, status: newStatus } : task
      )
    );
    setDraggedTaskId(null);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={style.con}>
        <div className={style.nav}>
          <Navbar />
        </div> 
        <div className={style.page}>
          <div>
            <Sidebar />
          </div> 
          <div className={style.body}>
            <div className='projectname'>Projects / {projectName}</div>

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
                  <div title='Add user' className={style.usname} onClick={toggleModal}>
                    <TiUserAdd />
                  </div>
                  {addPeople && <AddPeopleModal close={setAddPeople} />}
                </div>
                <div className={style.sprint}>
                  <p title='sprint'>Sprint<FaCaretDown /></p>
                </div>
              </div>
            </div>

            <div className={style.todocon}>
              {/* To Do Column */}
              <div
                className={style.todobox}
                onDragOver={allowDrop}
                onDrop={() => handleDrop('TODO')}
              >
                <p className={style.flow}>TO DO</p>
                {filterTasksByStatus('TODO').map((task) => (
                  <div
                    key={task.id}
                    className={style.taskbox}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onClick={toggleIssueModal}
                  >
                    <div className={style.inner}><p>{task.title}</p> <HiDotsHorizontal /></div>
                    <div className={style.inner}><p>{task.taskId}</p>
                      <div className={style.usname}>{task.assignee[0]}</div>
                    </div>
                  </div>
                ))}
                {issueModal && <IssueModal closeModal={setIssueModal} />}
              </div>

              {/* In Progress Column */}
              <div
                className={style.todobox}
                onDragOver={allowDrop}
                onDrop={() => handleDrop('IN PROGRESS')}
              >
                <p className={style.flow}>IN PROGRESS</p>
                {filterTasksByStatus('IN PROGRESS').map((task) => (
                  <div
                    key={task.id}
                    className={style.taskbox}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                  >
                    <div className={style.inner}><p>{task.title}</p> <HiDotsHorizontal /></div>
                    <div className={style.inner}><p>{task.taskId}</p>
                      <div className={style.usname}>{task.assignee[0]}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Done Column */}
              <div
                className={style.todobox}
                onDragOver={allowDrop}
                onDrop={() => handleDrop('DONE')}
              >
                <p className={style.flow}>DONE <MdOutlineDone /></p>
                {filterTasksByStatus('DONE').map((task) => (
                  <div
                    key={task.id}
                    className={style.taskbox}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                  >
                    <div className={style.inner}><p>{task.title}</p> <HiDotsHorizontal /></div>
                    <div className={style.inner}><p>{task.taskId}</p>
                      <div className={style.usname}>{task.assignee[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
