import React, { useState, useEffect } from 'react';
import { IoShareSocialSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { TiUserAdd } from "react-icons/ti";
import { FaCaretDown, FaTrash } from "react-icons/fa"; 
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
  const [selectedSprint, setSelectedSprint] = useState(null);
  const { projectDetails, createSprintApi } = useProjectContext();
  const [sprints, setSprints] = useState([]);
  const [newSprintName, setNewSprintName] = useState('');
  const [newIssue, setNewIssue] = useState('');

  useEffect(() => {
    if (projectDetails) {
      setProjectName(projectDetails.Project_name || "Unnamed Project");
    }
  }, [projectDetails]);

  const toggleModal = () => {
    setAddPeople(prev => !prev);
  };

  const handleAddSprint = () => {
    const sprintName = newSprintName || `Sprint ${sprints.length + 1}`;
    const sprintData = { name: sprintName, issues: [] };

    setSprints([...sprints, sprintData]);
    setNewSprintName('');
  };

  const handleStartSprint = (sprint) => {
    setSelectedSprint(sprint); // Set the selected sprint
    setCreateSprint(true); // Open the create sprint modal
  };

  const handleIssueChange = (e) => {
    setNewIssue(e.target.value);
  };

  const handleAddIssue = (sprintIndex) => {
    if (newIssue) {
      const updatedSprints = [...sprints];
      updatedSprints[sprintIndex].issues.push(newIssue);
      setSprints(updatedSprints);
      setNewIssue('');
    }
  };

  const handleDeleteIssue = (sprintIndex, issueIndex) => {
    const updatedSprints = [...sprints];
    updatedSprints[sprintIndex].issues = updatedSprints[sprintIndex].issues.filter((_, i) => i !== issueIndex);
    setSprints(updatedSprints);
  };

  const handleDeleteSprint = (index) => {
    const updatedSprints = sprints.filter((_, sprintIndex) => sprintIndex !== index);
    setSprints(updatedSprints);
  };

  const closeCreateSprintModal = () => {
    setCreateSprint(false);
    setSelectedSprint(null); // Reset selected sprint when closing the modal
  };

  return (
    <>
      <Navbar />
      <div className={style.blhead}>
        <Sidebar />
        <div className={style.title}>
          <div className='projectname'>Project / {projectName}</div>
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
            <span className={style.create} onClick={handleAddSprint}>
              Create sprint
            </span>
            {createSprint && (
              <div className={style.sprintModal}>
                <input
                  className={style.input} 
                  type='text' 
                  value={newSprintName}
                  onChange={(e) => setNewSprintName(e.target.value)}
                  placeholder='Enter sprint name'
                />
                <button className={style.sprintButton} onClick={handleAddSprint}>Add Sprint</button>
              </div>
            )}
          </div>

          <div className={style.text}>
            {sprints.length === 0 ? (
              <p className={style.empty}>Your backlog is empty</p>
            ) : (
              sprints.map((sprint, index) => (
                <div key={index} className={style.sprint}>
                  <div className={style.sprintHeader}>
                    <div className={style.sname}>
                      <h3>{projectName.toUpperCase()} {sprint.name}</h3>
                      <FaTrash 
                        className={style.deleteIcon} 
                        onClick={() => handleDeleteSprint(index)}
                        title="Delete sprint"
                      />
                    </div>
                    <button className={style.startsb} onClick={() => handleStartSprint(sprint)}>Start Sprint</button>
                  </div>
                  {createSprint && (
                    <CreateSprintModal 
                      close={closeCreateSprintModal} 
                      projectId={projectDetails._id} 
                      onCreateSprint={createSprintApi} 
                      sprintName={sprint.name} // Pass the selected sprint's name
                      issues={sprint.issues} // Pass the selected sprint's issues
                    />
                  )}
                  <hr />
                  <div className={style.issues}>
                    {sprint.issues.map((issue, i) => (
                      <div key={i} className={style.issueItem}>
                        <p>{issue}</p>
                        <FaTrash 
                          className={style.deleteIcon} 
                          onClick={() => handleDeleteIssue(index, i)}
                          title="Delete issue"
                        />
                      </div>
                    ))}
                  </div>
                  {selectedSprint === index ? (
                    <div className={style.issueInput}>
                      <input
                        type="text"
                        value={newIssue}
                        onChange={handleIssueChange}
                        placeholder="Enter issue name"
                      />
                      <button className={style.addIssueButton} onClick={() => handleAddIssue(index)}>Add Issue</button>
                    </div>
                  ) : (
                    <button className={style.creteIssueButton} onClick={() => setSelectedSprint(index)}>+ Create issue</button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Backlog;
