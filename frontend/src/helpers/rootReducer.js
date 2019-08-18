import { combineReducers } from 'redux';

import { user } from 'modules/user/userReducer.js';
import { registration } from 'modules/user/registrationReducer.js';
import { profile } from 'modules/profile//profileReducer.js';
import { post } from 'modules/post/postReducer.js';
import { comment } from 'modules/comment/commentReducer.js';


export const rootReducer = combineReducers({
  user,
  registration,
  profile,
  post,
  comment
});
