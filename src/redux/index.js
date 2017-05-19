import { combineReducers } from 'redux';

import auth from '@redux/auth/reducer'
import nav from '@redux/nav/reducer'
import setting from '@redux/setting/reducer'

// Combine all
const appReducer = combineReducers({
  auth, nav, setting
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;