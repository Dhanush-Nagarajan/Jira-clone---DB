import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectList } from '../../../redux/actions/projectActions.js';
import Navbar from '../../HomePage/Navbar';
import style from './ListProject.module.css';
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const ListProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Access data from the Redux store
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjectList());
  }, [dispatch]);

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
              <div key={project.id} className={style.probody}>
                <p className={style.tablebo} onClick={() => navigate(`/project/${project.id}`)}>{project.name}</p>
                <p className={style.tableb}>{project.key}</p>
                <p className={style.tablebo}>{project.lead}</p>
                <div>
                  <HiDotsHorizontal className={style.tableb} />
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
