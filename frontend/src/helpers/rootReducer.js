import { combineReducers } from 'redux';

import { users } from '../user/userReducer.js';
import { registration } from '../user/registrationReducer.js';

export const rootReducer = combineReducers({
  users,
  registration
});
