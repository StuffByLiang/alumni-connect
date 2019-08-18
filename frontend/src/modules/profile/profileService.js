import axios from 'axios';

export const profileService = {
    saveChanges,
};

async function saveChanges(info, file) {
  let data = new FormData();
  if(file) data.append('image', file, file.name)

  for(let category in info) {
    data.append(category, info[category]);
  }

  for (var pair of data.entries()) {
    console.log(pair[0]);
    console.log(pair[1])
  }

  let response = await axios.post('/user/update', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
  return handleResponse(response);
}


function handleResponse(response) {
  if(!response.data.success) throw response.data.message;
  return response.data;
}
