import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList, deleteProjectById } from '../../../redux/actions/projectActions.js';
import { fetchLeadById } from '../../../redux/actions/leadActions'; // Import fetchLeadById action
import Navbar from '../../HomePage/Navbar';
import style from './ListProject.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const ListProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { lead, leadLoading, leadError } = useSelector((state) => state.lead); // Access lead state
  
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [leadNames, setLeadNames] = useState({}); // State to store lead names by ID

  useEffect(() => {
    dispatch(fetchProjectList());
  }, [dispatch]);

  useEffect(() => {
    // Fetch lead details for all projects
    const fetchAllLeads = async () => {
      const uniqueLeadIds = [...new Set(projects.map((project) => project.createdBy))];
      for (const createdBy of uniqueLeadIds) {
        if (createdBy) {
          dispatch(fetchLeadById(createdBy));
        }
      }
    };

    fetchAllLeads();
  }, [projects, dispatch]);

  useEffect(() => {
    if (lead) {
      setLeadNames((prevLeadNames) => ({
        ...prevLeadNames,
        [lead._id]: lead.fullName // Use fullName from lead data
      }));
    }
  }, [lead]);

  const handleToggleDropdown = (projectId) => {
    setActiveDropdown(activeDropdown === projectId ? null : projectId);
  };

  const deleteProject = (projectId) => {
    dispatch(deleteProjectById(projectId));
  };

  if (loading || leadLoading) return <p>Loading...</p>;
  if (error || leadError) return <p>Error: {error || leadError}</p>;

  return (
    <div className={style.con}>
      <div className={style.nav}>
        <Navbar />
      </div>

      <div className={style.body}>
        <div className={style.topcon}>
          <h2>Projects</h2>
          <div>
            <button className={style.createButton} onClick={() => navigate('/create-project')}>Create Project</button>
          </div>
        </div>

        <div>
          <input type="text" placeholder='Search projects..' className={style.ip} />
        </div>

        <div className={style.procon}>
          <div className={style.prohead}>
            <p className={style.tableb}>Name</p>
            <p className={style.tableb}>Key</p>
            <p className={style.tableb}>Lead</p>
            <p className={style.tableb}>More Actions</p>
          </div>
          <hr />

          {projects.length === 0 ? (
            <p className={style.noProjects}>No available projects</p>
          ) : (
            <div className={style.tablebcon}>
              {projects.map((project) => (
                <div className={style.probody} key={project._id}>
                  <p className={style.tablebo} onClick={() => navigate('/project')}>{project.Project_name}</p>
                  <p className={style.tableb}>{project.Key}</p>
                  <p className={style.tablebo}>{leadNames[project.createdBy] || 'Loading...'}</p> {/* Display lead name */}

                  <div className={style.moreActions}>
                    <HiDotsHorizontal 
                      className={style.tableb}
                      onClick={() => handleToggleDropdown(project._id)} 
                    />
                    {activeDropdown === project._id && (
                      <div className={style.dropdown}>
                        <p onClick={() => deleteProject(project._id)}>Delete</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <hr />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProject;
