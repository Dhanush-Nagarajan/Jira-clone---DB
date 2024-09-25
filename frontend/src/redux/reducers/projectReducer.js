import {
  FETCH_PROJECT_LIST_REQUEST,
  FETCH_PROJECT_LIST_SUCCESS,
  FETCH_PROJECT_LIST_FAILURE,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECT_BY_ID_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
} from '../actions/projectActions';

const initialState = {
  projects: [],
  project: null,  
  loading: false,
  error: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_LIST_REQUEST:
    case FETCH_PROJECT_BY_ID_REQUEST:
    case DELETE_PROJECT_REQUEST:
      return { ...state, loading: true, error: null }; 

    case FETCH_PROJECT_LIST_SUCCESS:
      return { ...state, loading: false, projects: action.payload, error: null };

    case FETCH_PROJECT_BY_ID_SUCCESS:
      return { ...state, loading: false, project: action.payload, error: null };

    case FETCH_PROJECT_LIST_FAILURE:
    case FETCH_PROJECT_BY_ID_FAILURE:
    case DELETE_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter((project) => project._id !== action.payload),
        error: null,
      };

    default:
      return state;
  }
};

export default projectReducer;
