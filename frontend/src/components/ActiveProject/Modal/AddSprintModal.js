import React, { useState } from 'react';
import style from './AddSprintModal.module.css'; 
const AddSprintModal = ({ close, addSprint }) => {
  const [sprintName, setSprintName] = useState('');
  const [issues, setIssues] = useState([{ title: '', assignee: '' }]);

  const handleInputChange = (index, field, value) => {
    const updatedIssues = [...issues];
    updatedIssues[index][field] = value;
    setIssues(updatedIssues);
  };

  const addIssue = () => {
    setIssues([...issues, { title: '', assignee: '' }]);
  };

  const handleSubmit = () => {
    addSprint({ sprintName, issues });
    close(false);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h3>Create New Sprint</h3>
        <input
          type="text"
          placeholder="Sprint Name"
          value={sprintName}
          onChange={(e) => setSprintName(e.target.value)}
        />
        <div>
          {issues.map((issue, index) => (
            <div key={index} className={style.issueInput}>
              <input
                type="text"
                placeholder="Issue Title"
                value={issue.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
              <input
                type="text"
                placeholder="Assignee"
                value={issue.assignee}
                onChange={(e) => handleInputChange(index, 'assignee', e.target.value)}
              />
            </div>
          ))}
        </div>
        <button onClick={addIssue}>Add Issue</button>
        <button onClick={handleSubmit}>Create Sprint</button>
        <button onClick={() => close(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddSprintModal;
