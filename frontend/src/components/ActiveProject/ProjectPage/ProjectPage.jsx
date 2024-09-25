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
import { fetchLeadById } from '../../../redux/actions/leadActions'; // Import the action to fetch lead

const ProjectPage = () => {
  const dispatch = useDispatch();
  const [addPeople, setAddPeople] = useState(false);
  const [issueModal, setIssueModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [projectName, setProjectName] = useState('Sample Project');
  const [tasks, setTasks] = useState([]);
  const [leadNames, setLeadNames] = useState({}); // State to store lead names by ID
  const [viewMore, setViewMore] = useState(false); // State to manage dropdown visibility for participants

  const { projectDetails, loading, error, fetchParticipants, participants } = useProjectContext();
  const userData = JSON.parse(localStorage.getItem('user'));

  // Ref to track previous project details
  const prevProjectDetailsRef = useRef();

  // Fetch leads for the project
  useEffect(() => {
    const fetchLeads = async () => {
      if (projectDetails && projectDetails.createdBy) {
        dispatch(fetchLeadById(projectDetails.createdBy)); // Fetch lead by createdBy ID
      }
    };

    fetchLeads();
  }, [dispatch, projectDetails]);

  // To handle fetched lead data
  const lead = useSelector((state) => state.lead.lead); // Access the lead state

  useEffect(() => {
    if (lead) {
      setLeadNames((prevLeadNames) => ({
        ...prevLeadNames,
        [lead._id]: lead.fullName // Store lead name by ID
      }));
    }
  }, [lead]);

  // Use callback to memoize the fetch function
  const fetchProjectParticipants = useCallback(() => {
    if (projectDetails && projectDetails._id) {
      fetchParticipants(projectDetails._id);
    }
  }, [projectDetails, fetchParticipants]);

  useEffect(() => {
    if (projectDetails) {
      const newProjectName = projectDetails.Project_name || "Unnamed Project";

      // Update projectName if it has changed
      if (newProjectName !== projectName) {
        setProjectName(newProjectName);
      }

      const newTasks = projectDetails.tasks || [];

      // Update tasks only if they have changed
      if (JSON.stringify(newTasks) !== JSON.stringify(tasks)) {
        setTasks(newTasks);
      }

      // Fetch participants only if the project details have changed
      if (prevProjectDetailsRef.current !== projectDetails) {
        fetchProjectParticipants();
        prevProjectDetailsRef.current = projectDetails; // Update the ref with current projectDetails
      }
    }
  }, [projectDetails, fetchProjectParticipants, projectName, tasks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleModal = () => {
    setAddPeople(true);
  };

  const toggleIssueModal = () => {
    setIssueModal(true);
  };

  const toggleViewMore = () => {
    setViewMore(!viewMore); // Toggle the viewMore state
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
      {leadName.charAt(0).toUpperCase()} {/* Display the first letter of the lead's name in uppercase */}
    </div>
  ))}

  {/* Display up to 5 participants */}
  {participants.slice(0, 3).map((participant, index) => (
    <div key={index} className={style.usname}>
      {participant.fullName.charAt(0).toUpperCase()} {/* First letter of participant's full name */}
    </div>
  ))}

  <button className={style.bgc} onClick={toggleViewMore}>View More</button>

  {/* Dropdown with full participants list */}
  {viewMore && (
    <div className={style.dropdown}>
      {participants.map((participant, index) => (
        <div key={index} className={style.dropdownItem}>
          {participant.fullName}
        </div>
      ))}
    </div>
  )}

  <div title='Add user' className={style.usname} onClick={toggleModal}>
    <TiUserAdd />
  </div>
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
              {issueModal && <IssueModal closeModal={setIssueModal} />}
            </div>

            {/* In Progress Column */}
            <div className={style.todobox} onDragOver={allowDrop} onDrop={() => handleDrop('IN PROGRESS')}>
              <p className={style.flow}>IN PROGRESS</p>
              {filterTasksByStatus('IN PROGRESS').map((task) => (
                <div key={task.id} className={style.taskbox} draggable onDragStart={() => handleDragStart(task.id)}>
                  <div className={style.inner}><p>{task.title}</p> <HiDotsHorizontal /></div>
                  <div className={style.inner}><p>{task.taskId}</p><div className={style.usname}>{task.assignee[0]}</div></div>
                </div>
              ))}
            </div>

            {/* Done Column */}
            <div className={style.todobox} onDragOver={allowDrop} onDrop={() => handleDrop('DONE')}>
              <p className={style.flow}>DONE <MdOutlineDone /></p>
              {filterTasksByStatus('DONE').map((task) => (
                <div key={task.id} className={style.taskbox} draggable onDragStart={() => handleDragStart(task.id)}>
                  <div className={style.inner}><p>{task.title}</p> <HiDotsHorizontal /></div>
                  <div className={style.inner}><p>{task.taskId}</p><div className={style.usname}>{task.assignee[0]}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
