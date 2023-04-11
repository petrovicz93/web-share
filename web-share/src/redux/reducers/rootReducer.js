import { combineReducers } from 'redux';
import app from './app.js';
import global from './globalReducer';
import fileshare from './fileshare';
import member from './member';
import group from './group';
import contact from './contact';

const appReducer = combineReducers({
  app,
  global,
  fileshare,
  member,
  group,
  contact,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
