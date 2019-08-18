import { userConstants } from './userConstants.js';

let userData = JSON.parse(localStorage.getItem('user'));
const initialState = userData ? { loggedIn: true, user: userData, data: null } : { data: null };

export function user(state = initialState, action) {
  // console.log("user", state, action);
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        data: action.data.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        error: action.error
      };

    case userConstants.LOGOUT_REQUEST:
    case userConstants.LOGOUT_SUCCESS:
    case userConstants.LOGOUT_FAILURE:
      return { data: null };

    case userConstants.GET_PROFILE_REQUEST:
      return state;
    case userConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.data.user
      };
    case userConstants.GET_PROFILE_FAILURE:
      return state;

    default:
      // console.log(`default action '${action.type}'. Is this a mistake?`)
      return state
  }
}
