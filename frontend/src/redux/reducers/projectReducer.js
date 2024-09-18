// redux/reducers/projectReducer.js
import {
  FETCH_PROJECT_LIST_REQUEST,
  FETCH_PROJECT_LIST_SUCCESS,
  FETCH_PROJECT_LIST_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE
} from '../actions/projectActions';

const initialState = {
  projects: [],
  loading: false,
  error: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_LIST_REQUEST:
      return { ...state, loading: true };
    case FETCH_PROJECT_LIST_SUCCESS:
      return { ...state, loading: false, projects: action.payload };
    case FETCH_PROJECT_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PROJECT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter((project) => project._id !== action.payload),
      };
    case DELETE_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default projectReducer;
