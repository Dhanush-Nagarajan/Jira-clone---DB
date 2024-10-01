import React, { useState, useEffect } from 'react';
import style from './CreateSprintModal.module.css';

const CreateSprintModal = ({ close, projectId, onCreateSprint, sprintName, issues }) => {
  const [duration, setDuration] = useState('3 days'); // Set a default duration
  const [sprintGoal, setSprintGoal] = useState('');

  useEffect(() => {
    // This effect runs when the modal is opened, and you can set the initial values if necessary.
    setDuration('3 days'); // Reset to a default value when modal opens
    setSprintGoal(''); // Clear sprint goal when modal opens
  }, [close]);

  const handleOverlayCreate = (e) => {
    if (e.target.className === style.Modal) {
      close(false);
    }
  };

  const handleStartSprint = () => {
    if (sprintName && sprintGoal) {
      const sprintData = { name: sprintName, duration, goal: sprintGoal, issues };
      onCreateSprint(projectId, sprintData);
      console.log(projectId, sprintData);
      close(false);
    } else {
      
      console.warn('Sprint name and goal are required.');
    }
  };

  return (
    <div className={style.Modal} onClick={handleOverlayCreate}>
      <div className={style.Modal1}>
        <h3 className={style.h}>Start Sprint</h3>
        <div>
          <label>Sprint name</label> <br />
          <input 
            type="text" 
            className={style.inp} 
            value={sprintName} 
            disabled // Make the sprint name read-only
          /> <br/>
          <label htmlFor="duration">
            Duration
            <select 
              name="duration" 
              id="duration" 
              className={style.opt} 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="3 days">3 days</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="1 month">1 month</option>
            </select>
          </label>
          <label>Sprint goal</label> <br />
          <input 
            type="text" 
            className={style.desc} 
            value={sprintGoal} 
            onChange={(e) => setSprintGoal(e.target.value)} 
          />
        </div>
        <div className={style.button}>
          <button className={style.cancel} onClick={() => close(false)}>Cancel</button>
          <button className={style.submit} onClick={handleStartSprint}>Start Sprint</button>
        </div>
      </div>
    </div>
  );
};

export default CreateSprintModal;
