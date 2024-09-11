import React, { useState, useEffect, useContext } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import style from './CreateProject.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext.jsx';

const CreateProject = () => {
  const { user } = useContext(AuthContext); 
  const [Project_name, setProjectName] = useState('');
  const [Access, setAccess] = useState('Private');
  const [Key, setKey] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (Project_name.length >= 3) {
      setKey(Project_name.substring(0, 3).toUpperCase());
      
    } else {
      setKey('');
    }
  }, [Project_name]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!Project_name || !Key) {
      setError('Please fill out all required fields.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:2000/api/projects/createproject', {
        Project_name,
        Access,
        Key,
      }, {
        withCredentials: true,
      });
    
      if (response.status === 201) {
        setError('');
        navigate('/project');
        console.log('Project Created')
      } else {
        setError('Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Error creating project:', error.message);
      setError(error.response?.data?.error || 'An error occurred. Please try again later.');
    }
  };
  
  return (
    <form onSubmit={handleCreate}>
      <div className={style.header}>
        <div className={style.head}>
          <div className={style.inner}>
            <FaArrowLeft className={style.icon} onClick={() => navigate('/home')} />
            <span className={style.icon} onClick={() => navigate('/home')}>Back to Home</span>
          </div>
        </div>
        <div className={style.body}>
          <div className={style.innerbody}>
            <h1>Add Project Details</h1>
            <p className={style.p}>
              Explore what's possible when you collaborate with your team. <br />
              Edit project details anytime in project settings.
            </p>
            <div className={style.projectdetails}>
              <label className={style.p}>Project Name</label>
              <input
                className={style.ip}
                type='text'
                placeholder='Project Name'
                value={Project_name}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <br />
              <label htmlFor="access" className={style.p}>Access<br /></label>
              <select
                name="access"
                id="access"
                className={style.ip}
                value={Access}
                onChange={(e) => setAccess(e.target.value)}
              >
                <option className={style.ip} value="Private">Private</option>
                <option className={style.ip} value="Limited">Limited</option>
                <option className={style.ip} value="Open">Open</option>
              </select>
              <br />
              <label className={style.p}>Key</label>
              <input
                type="text"
                className={style.ip}
                placeholder='Project Key'
                value={Key}
                readOnly
              />
            </div>
            {error && <p className={style.error}>{error}</p>}
            <div className={style.buttondiv}>
              <button
                type="button"
                className={style.button1}
                onClick={() => navigate('/home')}
              >
                Cancel
              </button>
              <button
                type='submit'
                className={style.button2}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProject;
