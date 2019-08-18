import axios from 'axios';

export const commentService = {
    uploadComment,
    getComments,
};

async function uploadComment(query) {
  let response = await axios.post('/comment', query);
  return handleResponse(response);
}

async function getComments(query) {
  let response = await axios.get('/comment', {
    params: query
  });
  console.log(response)
  return handleResponse(response);
}


function handleResponse(response) {
  if(!response.data.success) throw response.data.message;
  return response.data;
}
