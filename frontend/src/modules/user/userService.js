import axios from 'axios';

export const userService = {
    login,
    logout,
    getProfile,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

async function login(username, password) {
  const data = {
    loginInfo: username,
    password: password,
  };

  let response = await axios.post('/user/login', data);
  return handleResponse(response);
}

async function logout() {
  let response = await axios.get('/user/logout');
  return handleResponse(response);
}

async function getProfile(info) {
  let token = JSON.parse(localStorage.getItem('user')).token;
  let response = await axios.post('/user/login/jwt', {
    token: token,
  });
  return handleResponse(response);
}

function handleResponse(response) {
  if(!response.data.success) throw response.data.message;
  return response.data;
}
