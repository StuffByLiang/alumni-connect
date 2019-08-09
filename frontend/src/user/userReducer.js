import { userConstants } from './userConstants.js';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function users(state = initialState, action) {
  // console.log("user", state, action);
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loading: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };

    case userConstants.LOGOUT_REQUEST:
    case userConstants.LOGOUT_SUCCESS:
    case userConstants.LOGOUT_FAILURE:
      return {};

    default:
      console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
