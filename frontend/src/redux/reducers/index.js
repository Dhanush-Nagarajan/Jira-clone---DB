import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import leadReducer from './leadReducer'; // Import other reducers

const rootReducer = combineReducers({
  projects: projectReducer,   // Manages the projects state
  lead: leadReducer,          // Manages the lead state
  // Add other reducers as needed
});

export default rootReducer;
