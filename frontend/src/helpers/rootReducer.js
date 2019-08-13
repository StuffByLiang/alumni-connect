import { combineReducers } from 'redux';

import { users } from '../user/userReducer.js';
import { registration } from '../user/registrationReducer.js';
import { profile } from '../profile/profileReducer.js';


export const rootReducer = combineReducers({
  users,
  registration,
  profile
});
