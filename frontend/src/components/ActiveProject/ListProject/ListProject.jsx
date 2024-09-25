import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList, deleteProjectById } from '../../../redux/actions/projectActions';
import { fetchLeadById } from '../../../redux/actions/leadActions';
import Navbar from '../../HomePage/Navbar';
import style from './ListProject.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../../../Context/ProjectContext'

const ListProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fetchProjectDetails } = useProjectContext();

  const handleProjectClick = (projectId) => {
    fetchProjectDetails(projectId);
    navigate('/project');
  };
  
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { lead, leadLoading, leadError } = useSelector((state) => state.lead);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [leadNames, setLeadNames] = useState({}); // Store lead names by ID
  const [searchTerm, setSearchTerm] = useState(''); // Add search state

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.Project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const editProject = (projectId) => {
    navigate(`/edit-project/${projectId}`); // Navigate to edit project page
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
          {/* Add search input */}
          <input 
            type="text" 
            placeholder='Search projects..' 
            className={style.ip} 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>

        <div className={style.procon}>
          <div className={style.prohead}>
            <p className={style.tableb}>Name</p>
            <p className={style.tableb}>Key</p>
            <p className={style.tableb}>Lead</p>
            <p className={style.tablebend}>More Actions</p>
          </div>
          <hr />

          {filteredProjects.length === 0 ? (
            <p className={style.noProjects}>No projects found</p>
          ) : (
            <div className={style.tablebcon}>
              {filteredProjects.map((project) => (
                <div key={project._id} className={style.conheight}> {/* Move the key here */}
                  <div className={style.probody}>
                    <p className={style.tablebon} onClick={() => handleProjectClick(project._id)}>{project.Project_name}</p>
                    <p className={style.tableb}>{project.Key}</p>
                    <p className={style.tablebo}>
                      {leadNames[project.createdBy] 
                        ? leadNames[project.createdBy].charAt(0).toUpperCase() + leadNames[project.createdBy].slice(1).toLowerCase()
                        : 'Loading...'}
                    </p>

                    <div className={style.moreActions}>
                      <HiDotsHorizontal 
                        className={style.tableb}
                        onClick={() => handleToggleDropdown(project._id)} 
                      />
                      {activeDropdown === project._id && (
                        <div className={style.dropdown}>
                          <p onClick={() => editProject(project._id)}>Edit</p> {/* Edit option */}
                          <p onClick={() => deleteProject(project._id)}>Delete</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProject;
