import axios from 'axios';

export const FETCH_PROJECT_LIST_REQUEST = 'FETCH_PROJECT_LIST_REQUEST';
export const FETCH_PROJECT_LIST_SUCCESS = 'FETCH_PROJECT_LIST_SUCCESS';
export const FETCH_PROJECT_LIST_FAILURE = 'FETCH_PROJECT_LIST_FAILURE';

export const fetchProjectList = () => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_LIST_REQUEST });

  try {
    const response = await axios.get('/api/projects/getprojects'); // Adjust the URL as needed
    dispatch({ type: FETCH_PROJECT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PROJECT_LIST_FAILURE, payload: error.message });
  }
};
