import React, { createContext, useContext, useState} from 'react';
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


  return (
    <ProjectContext.Provider value={{ projectDetails, fetchProjectDetails, participants, fetchParticipants, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
