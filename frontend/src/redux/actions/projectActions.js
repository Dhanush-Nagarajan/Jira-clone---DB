import axios from 'axios';

export const FETCH_PROJECT_LIST_REQUEST = 'FETCH_PROJECT_LIST_REQUEST';
export const FETCH_PROJECT_LIST_SUCCESS = 'FETCH_PROJECT_LIST_SUCCESS';
export const FETCH_PROJECT_LIST_FAILURE = 'FETCH_PROJECT_LIST_FAILURE';

export const FETCH_PROJECT_BY_ID_REQUEST = 'FETCH_PROJECT_BY_ID_REQUEST';
export const FETCH_PROJECT_BY_ID_SUCCESS = 'FETCH_PROJECT_BY_ID_SUCCESS';
export const FETCH_PROJECT_BY_ID_FAILURE = 'FETCH_PROJECT_BY_ID_FAILURE';

export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';

// Fetch project list
export const fetchProjectList = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: FETCH_PROJECT_LIST_FAILURE, payload: "No token found" });
    return;
  }

  dispatch({ type: FETCH_PROJECT_LIST_REQUEST });

  try {
    const response = await axios.get('http://localhost:2000/api/projects/getprojects', {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: FETCH_PROJECT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({ type: FETCH_PROJECT_LIST_FAILURE, payload: 'Unauthorized: Invalid or expired token.' });
    } else {
      dispatch({ type: FETCH_PROJECT_LIST_FAILURE, payload: error.message });
    }
  }
};

// Fetch project by ID
export const fetchProjectById = (projectId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, payload: "No token found" });
    return;
  }

  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });

  try {
    const response = await axios.get(`http://localhost:2000/api/projects/getparticipants/${projectId}`, {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, payload: 'Unauthorized: Invalid or expired token.' });
    } else {
      dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE, payload: error.message });
    }
  }
};

export const deleteProjectById = (projectId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  console.log(token)
  console.log(projectId)
  if (!token) {
    dispatch({ type: DELETE_PROJECT_FAILURE, payload: "No token found" });
    return;
  }

  dispatch({ type: DELETE_PROJECT_REQUEST });

  try {
    await axios.delete(`http://localhost:2000/api/projects//deleteproject/${projectId}`, {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectId });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({ type: DELETE_PROJECT_FAILURE, payload: 'Unauthorized: Invalid or expired token.' });
    } else {
      dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.message });
    }
  }
};
