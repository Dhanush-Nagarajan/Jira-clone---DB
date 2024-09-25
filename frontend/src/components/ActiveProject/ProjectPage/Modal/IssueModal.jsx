import React, { useEffect, useState } from 'react';
import style from './IssueModal.module.css';
import { IoClose } from "react-icons/io5";
import { useProjectContext } from '../../../../Context/ProjectContext';

const IssueModal = ({ closeModal }) => {
  const { projectDetails, fetchParticipants, participants } = useProjectContext();
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const [assignedPerson, setAssignedPerson] = useState("Unassigned"); // State to track the selected assignee

  // Only trigger fetching participants when projectDetails change
  useEffect(() => {
    if (projectDetails && projectDetails._id) {
      fetchParticipants(projectDetails._id);
    }
  }, [projectDetails, fetchParticipants]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle participant selection
  const handleAssign = (participant) => {
    setAssignedPerson(participant.fullName); // Set the selected participant as assigned person
    setShowDropdown(false); // Close the dropdown after selection
  };

  return (
    <div className={style.modalcon}>
      <div className={style.modal}>
        <div className={style.close} onClick={() => closeModal(false)}><IoClose/></div>
        <div className={style.leftcon}>
          <h3>Login</h3> 
          <br />
          <h5>Description</h5>
          <input type="text" placeholder='Add description...' className={style.input} />
          <br />
          <h3>Activity</h3>
          <br />
          <div className={style.addcomment}>
            <div className={style.usname}>
              <p>B</p>
            </div>
            <input type="text" className={style.commentip} placeholder='Add a comment'/> 
            <button className={style.submit}>Submit</button>
          </div>

          <br />
          <div className={style.cbox}>
            {participants && participants.length > 0 ? (
              participants.map((participant, index) => (
                <div className={style.vucomment} key={index}>
                  <div>
                    <div className={style.usname}>
                      <p>{participant.fullName ? participant.fullName[0] : 'U'}</p> 
                    </div>
                  </div>
                  <div>
                    <h5>{participant.fullName || 'Unknown'}</h5> 
                    <p>{participant.email || 'No email'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No participants available</p>
            )}
          </div>
        </div>
        <div className={style.tablebox}>
          <div className={style.detail}><p>Details</p></div>
          <div className={style.tableboxbottom}>
            <div >
              <p className={style.tablecontent} >Assign</p>
              <p className={style.tablecontent}>Label</p>
              <p className={style.tablecontent}>Parent</p>
              <p className={style.tablecontent}>Reporter</p>
            </div>
            <div>
              <p className={style.tablecontent} style={{cursor:'pointer'}} onClick={toggleDropdown}>
                {assignedPerson} 
              </p>

              
              {showDropdown && (
                <div className={style.dropdown}>
                  {participants.map((participant) => (
                    <div 
                      key={participant._id}
                      className={style.dropdownItem}
                      onClick={() => handleAssign(participant)}
                    >
                      {participant.fullName}
                    </div>
                  ))}
                </div>
              )}

              <p className={style.tablecontent}>None</p>
              <p className={style.tablecontent}>None</p>
              <p className={style.tablecontent}>Bala</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
