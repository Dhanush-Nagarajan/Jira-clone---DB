import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectDetails = async (projectId) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:2000/api/projects/getprojectdetails/${projectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const obj = response.data;
      setProjectDetails(obj.project);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipants = async (projectId) => {
    if (participants.length > 0 && projectDetails && projectDetails._id === projectId) {
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:2000/api/projects/getparticipants/${projectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setParticipants(response.data);
      console.log('Participants fetched:', response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSprintApi = async (projectId, sprintData) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:2000/api/sprints/create`, { projectId, ...sprintData }, {
        headers: { Authorization: `${token}` },
      });
      console.log('Sprint created:', response.data);
      // Optionally, handle state updates or notifications here
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider value={{ 
      projectDetails, 
      fetchProjectDetails, 
      createSprintApi, 
      participants, 
      fetchParticipants, 
      loading, 
      error 
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
