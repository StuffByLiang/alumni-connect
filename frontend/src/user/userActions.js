import { userService } from './userService.js';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    // register,
    // getAll,
    // delete: _delete
};

function login(username, password) {
  return async (dispatch) => {
    dispatch(request({ username }));

    let response = await userService.login(username, password);

    // implement a try catch this shit is disgusting
    if(response.success) {
      localStorage.setItem('user', JSON.stringify(response.user));
      dispatch(success(response));
      history.push('/profile');
    } else {
      dispatch(failure(response.message))
    }

  };

  function request(user) { return { type: 'USER_LOGIN_REQUEST', user }}
  function success(data) { return { type: 'USER_LOGIN_SUCCESS', data }}
  function failure(error) { return { type: 'USER_LOGIN_FAILURE', error }}
};

function logout() {
  return async (dispatch) => {
    dispatch(request());

    let response = await userService.logout();
    localStorage.removeItem('user'); //remove the user item from local storage

    // implement a try catch this shit is disgusting
    if(response.success) {
      dispatch(success(response.message));
      history.push('/');
    } else {
      dispatch(failure(response.message))
    }
  };

  function request() { return { type: 'USER_LOGOUT_REQUEST' }}
  function success(message) { return { type: 'USER_LOGOUT_SUCCESS' }}
  function failure(message) { return { type: 'USER_LOGOUT_FAILURE' }}
}
