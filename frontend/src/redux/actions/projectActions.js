import axios from 'axios';

export const FETCH_PROJECT_LIST_REQUEST = 'FETCH_PROJECT_LIST_REQUEST';
export const FETCH_PROJECT_LIST_SUCCESS = 'FETCH_PROJECT_LIST_SUCCESS';
export const FETCH_PROJECT_LIST_FAILURE = 'FETCH_PROJECT_LIST_FAILURE';

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
    console.log(response.data)
    dispatch({ type: FETCH_PROJECT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    // If the error is due to an expired or invalid token
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized. Invalid or expired token.');
      dispatch({ type: FETCH_PROJECT_LIST_FAILURE, payload: 'Unauthorized: Invalid or expired token.' });
    } else {
      dispatch({ type: FETCH_PROJECT_LIST_FAILURE, payload: error.message });
    }
  }
};
