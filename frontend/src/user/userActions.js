import { userService } from './userService.js';

export const userActions = {
    login,
    // logout,
    // register,
    // getAll,
    // delete: _delete
};

function login(username, password) {
  return async (dispatch) => {
    dispatch(request({ username }));

    let response = await userService.login(username, password);
    if(response.success) {
      dispatch(success(response.data));
    } else {
      dispatch(failure(response.data))
    }

  };

  function request(user) { return { type: 'USER_LOGIN_REQUEST', user }}
  function success(user) { return { type: 'USER_LOGIN_SUCCESS', user }}
  function failure(user) { return { type: 'USER_LOGIN_FAILURE', error }}
};
