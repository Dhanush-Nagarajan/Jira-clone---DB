import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList } from '../../../redux/actions/projectActions.js';
import Navbar from '../../HomePage/Navbar';
import style from './ListProject.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const ListProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [activeDropdown, setActiveDropdown] = useState(null); // For managing which project's dropdown is active

  useEffect(() => {
    dispatch(fetchProjectList());
  }, [dispatch]);

  const handleToggleDropdown = (projectId) => {
    setActiveDropdown(activeDropdown === projectId ? null : projectId);
  };

  const deleteProject = (projectId) => {
    // Logic to delete the project (e.g., dispatch an action to delete it from backend)
    console.log("Deleting project with ID:", projectId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

          <div className={style.tablebcon}>
            {projects.map((project) => (
              <div className={style.probody} key={project._id}>
                <p className={style.tablebo} onClick={() => navigate('/project')}>{project.Project_name}</p>
                <p className={style.tableb}>{project.id}</p>
                <p className={style.tablebo}>{project.lead}</p>

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
        </div>
      </div>
    </div>
  );
};

export default ListProject;
