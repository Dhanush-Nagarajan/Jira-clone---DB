import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [participants, setParticipants] = useState([]); // State to hold the participants
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch project details by project ID
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

  // Function to fetch participants by project ID
  const fetchParticipants = async (projectId) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:2000/api/projects/getparticipants/${projectId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setParticipants(response.data);
      console.log('Participants:', response.data);
      console.log('fetched succssfully');
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
