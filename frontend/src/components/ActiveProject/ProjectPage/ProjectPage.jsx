import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadById } from '../../../redux/actions/leadActions';

const ProjectPage = () => {
  const dispatch = useDispatch();
  const [addPeople, setAddPeople] = useState(false);
  const [issueModal, setIssueModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [projectName, setProjectName] = useState('Sample Project');
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData?._id;

  // Static task data
  const staticTasks = [
    { id: '1', title: 'Design homepage', taskId: 'TASK-01', status: 'TODO', assignee: 'John' },
    { id: '2', title: 'Develop user login API', taskId: 'TASK-02', status: 'IN PROGRESS', assignee: 'Jane' },
    { id: '3', title: 'Create database schema', taskId: 'TASK-03', status: 'IN PROGRESS', assignee: 'Paul' },
    { id: '4', title: 'Test login functionality', taskId: 'TASK-04', status: 'DONE', assignee: 'Mike' },
    { id: '5', title: 'Fix login bug', taskId: 'TASK-05', status: 'DONE', assignee: 'Anna' }
  ];

  const [tasks, setTasks] = useState(staticTasks); // Initialize with static data
  const [leadNames, setLeadNames] = useState({});
  const [viewMore, setViewMore] = useState(false);
  const { projectDetails, loading, error, fetchParticipants, participants } = useProjectContext();
  const prevProjectDetailsRef = useRef();
  const dropdownRef = useRef(); // Create a ref for the dropdown

  useEffect(() => {
    const fetchLeads = async () => {
      if (projectDetails && projectDetails.createdBy) {
        dispatch(fetchLeadById(projectDetails.createdBy));
      }
    };
    fetchLeads();
  }, [dispatch, projectDetails]);

  const lead = useSelector((state) => state.lead.lead);

  useEffect(() => {
    if (lead) {
      setLeadNames((prevLeadNames) => ({
        ...prevLeadNames,
        [lead._id]: lead.fullName
      }));
    }
  }, [lead]);

  const fetchProjectParticipants = useCallback(() => {
    if (projectDetails && projectDetails._id) {
      fetchParticipants(projectDetails._id);
    }
  }, [projectDetails, fetchParticipants]);

  useEffect(() => {
    if (projectDetails) {
      const newProjectName = projectDetails.Project_name || "Unnamed Project";
      if (newProjectName !== projectName) {
        setProjectName(newProjectName);
      }

      // Check if project has tasks; if not, keep static tasks
      if (projectDetails.tasks && projectDetails.tasks.length > 0) {
        setTasks(projectDetails.tasks);
      }

      if (prevProjectDetailsRef.current !== projectDetails) {
        fetchProjectParticipants();
        prevProjectDetailsRef.current = projectDetails;
      }
    }
  }, [projectDetails, fetchProjectParticipants, projectName]);

  // Close dropdown on blur
  const handleBlur = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget)) {
      setViewMore(false);
    }
  };

  // Add event listener for blur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setViewMore(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleModal = () => {
    setAddPeople(true);
  };

  const toggleIssueModal = () => {
    setIssueModal(true);
  };

  const toggleViewMore = () => {
    setViewMore(!viewMore);
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

  // Check if user is the creator of the project
  const isProjectCreator = projectDetails?.createdBy === userId;

  return (
    <div className={style.con}>
      <div className={style.nav}>
        <Navbar />
      </div>
      <div className={style.page}>
        <Sidebar />
        <div className={style.body}>
          <div className='projectname'>Projects / {projectName}</div>
          <div className={style.sprintcon}>
            <div><h2>All Sprints</h2></div>
            <div className={style.option}>
              <AiFillThunderbolt className={style.icon} />
              <CiStar className={style.icon} />
              <IoShareSocialSharp className={style.icon} />
              <span className={style.bgc}>Complete sprint</span>
              <span className={style.bgc}><HiDotsHorizontal /></span>
            </div>
          </div>

          <div className={style.workcon}>
            <input type="search" placeholder='Search' className={style.input} />
            <div className={style.ucon}>
              {Object.values(leadNames).map((leadName, index) => (
                <div key={index} className={style.usname}>
                  {leadName.charAt(0).toUpperCase()}
                </div>
              ))}
              {participants.slice(0, 2).map((participant, index) => (
                <div key={index} className={style.usname}>
                  {participant.fullName.charAt(0).toUpperCase()}
                </div>
              ))}
              {participants.length > 1 && (
                <button
                  className={style.bgcd}
                  onClick={toggleViewMore}
                  onBlur={handleBlur}  // Handle blur event
                  ref={dropdownRef}  // Attach ref to dropdown
                >
                  <HiDotsHorizontal />
                </button>
              )}
              {viewMore && (
                <div className={style.dropdown} ref={dropdownRef}>
                  {participants.map((participant, index) => (
                    <div key={index} className={style.dropdownItem}>
                      {participant.fullName}
                    </div>
                  ))}
                </div>
              )}
              {isProjectCreator && (
                <div title='Add user' className={style.usname} onClick={toggleModal}>
                  <TiUserAdd />
                </div>
              )}
              {addPeople && <AddPeopleModal close={setAddPeople} />}
            </div>

            <div className={style.sprint}>
              <p title='sprint'>Sprint<FaCaretDown /></p>
            </div>
          </div>

          <div className={style.todocon}>
            {/* To Do Column */}
            <div className={style.todobox} onDragOver={allowDrop} onDrop={() => handleDrop('TODO')}>
              <p className={style.flow}>TO DO</p>
              {filterTasksByStatus('TODO').map((task) => (
                <div key={task.id} className={style.taskbox} draggable onDragStart={() => handleDragStart(task.id)} onClick={toggleIssueModal}>
                  <div className={style.inner}><p>{task.title}</p> <HiDotsHorizontal /></div>
                  <div className={style.inner}><p>{task.taskId}</p><div className={style.usname}>{task.assignee[0]}</div></div>
                </div>
              ))}
            </div>

            {/* In Progress Column */}
            <div className={style.todobox} onDragOver={allowDrop} onDrop={() => handleDrop('IN PROGRESS')}>
              <p className={style.flow}>IN PROGRESS</p>
              {filterTasksByStatus('IN PROGRESS').map((task) => (
                <div key={task.id} className={style.taskbox} draggable onDragStart={() => handleDragStart(task.id)} onClick={toggleIssueModal}>
                  <div className={style.inner}><p>{task.title}</p><HiDotsHorizontal /></div>
                  <div className={style.inner}><p>{task.taskId}</p><div className={style.usname}>{task.assignee[0]}</div></div>
                </div>
              ))}
            </div>

            {/* Done Column */}
            <div className={style.todobox} onDragOver={allowDrop} onDrop={() => handleDrop('DONE')}>
              <p className={style.flow}>DONE</p>
              {filterTasksByStatus('DONE').map((task) => (
                <div key={task.id} className={style.taskbox} draggable onDragStart={() => handleDragStart(task.id)} onClick={toggleIssueModal}>
                  <div className={style.inner}><p>{task.title}</p><HiDotsHorizontal /></div>
                  <div className={style.inner}><p>{task.taskId}</p><div className={style.usname}>{task.assignee[0]}</div></div>
                </div>
              ))}
            </div>
          </div>
          {issueModal && <IssueModal closeModal={setIssueModal} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
