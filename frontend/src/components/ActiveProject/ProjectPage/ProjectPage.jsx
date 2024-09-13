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
import IssueModal from './Modal/IssueModal';

const ProjectPage = () => {
  const [addPeople, setAddPeople] = useState(false);
  const [issueModal, setIssueModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Sample task data
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Login', status: 'TODO', assignee: 'M', taskId: 'PRJ-1' },
    { id: 2, title: 'Create dashboard', status: 'IN PROGRESS', assignee: 'A', taskId: 'PRJ-2' },
    { id: 3, title: 'Deploy app', status: 'DONE', assignee: 'T', taskId: 'PRJ-3' },
  ]);

  const toggleModal = () => {
    setAddPeople(true);
  };

  const toggleIssueModal = () => {
    setIssueModal(true);
  };

  // Helper function to filter tasks by status
  const filterTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // Handle drag start
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  // Handle drop
  const handleDrop = (newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTaskId ? { ...task, status: newStatus } : task
      )
    );
    setDraggedTaskId(null);
  };

  // Allow drag over for droppable areas
  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={style.body}>
        <div>Projects / Project 1</div>

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
              <p title='sprint'>Sprint <FaCaretDown /></p>
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
                  <div className={style.usname}>{task.assignee}</div>
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
                  <div className={style.usname}>{task.assignee}</div>
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
                  <div className={style.usname}>{task.assignee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
