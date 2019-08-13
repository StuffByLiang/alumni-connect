import axios from 'axios';

export const profileService = {
    saveChanges,
    getProfile
};

async function saveChanges(info) {

  let response = await axios.post('/user/update', {
    query: info,
  });
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
