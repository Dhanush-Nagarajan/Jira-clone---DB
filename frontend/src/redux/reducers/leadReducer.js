import {
  FETCH_LEAD_REQUEST,
  FETCH_LEAD_SUCCESS,
  FETCH_LEAD_FAILURE
} from '../actions/leadActions';

const initialState = {
  lead: null,
  loading: false,
  error: null
};

const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_LEAD_SUCCESS:
      return { ...state, loading: false, lead: action.payload };
    case FETCH_LEAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default leadReducer;
