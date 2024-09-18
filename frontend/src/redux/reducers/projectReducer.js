import {
  FETCH_PROJECT_LIST_REQUEST,
  FETCH_PROJECT_LIST_SUCCESS,
  FETCH_PROJECT_LIST_FAILURE
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
    default:
      return state;
  }
};

export default projectReducer;
