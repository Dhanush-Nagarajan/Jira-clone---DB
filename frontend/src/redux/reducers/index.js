import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
// Import other reducers

const rootReducer = combineReducers({
  projects: projectReducer,
  // Add other reducers
});

export default rootReducer;
