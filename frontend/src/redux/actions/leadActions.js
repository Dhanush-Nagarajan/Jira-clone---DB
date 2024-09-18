import axios from 'axios';

export const FETCH_LEAD_REQUEST = 'FETCH_LEAD_REQUEST';
export const FETCH_LEAD_SUCCESS = 'FETCH_LEAD_SUCCESS';
export const FETCH_LEAD_FAILURE = 'FETCH_LEAD_FAILURE';

export const fetchLeadById = (createdBy) => async (dispatch) => {
  dispatch({ type: FETCH_LEAD_REQUEST });

  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  try {
    const response = await axios.get(`http://localhost:2000/api/projects/getlead/${createdBy}`, {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    });
    dispatch({ type: FETCH_LEAD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_LEAD_FAILURE, payload: error.message });
  }
};
