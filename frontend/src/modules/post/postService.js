import axios from 'axios';

export const postService = {
    uploadPost,
    getPosts,
};

async function uploadPost(groupId, post) {
  let response = await axios.post('/post', {
    groupId,
    post,
  });
  return handleResponse(response);
}

async function getPosts(query) {
  let response = await axios.get('/post', {
    params: query
  });
  console.log(response)
  return handleResponse(response);
}


function handleResponse(response) {
  if(!response.data.success) throw response.data.message;
  return response.data;
}
