import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import leadReducer from './leadReducer'; 

const rootReducer = combineReducers({
  projects: projectReducer,   
  lead: leadReducer,          
  
});

export default rootReducer;
