import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import eventReducer from './features/events/eventSlice';

const rootReducer = combineReducers({
  user: userReducer,
  events: eventReducer,
});

export default rootReducer;
