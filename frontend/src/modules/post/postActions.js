import { postService } from './postService.js';
import { postConstants } from './postConstants.js';

export const postActions = {
    uploadPost,
    getPosts,
};

function uploadPost(groupId, post) {
  return async (dispatch, getState) => {
    dispatch(request());

    try {
      let response = await postService.uploadPost(groupId, post);

      dispatch(success(response));
    } catch (error) {
      dispatch(failure(error))
    }
  };

  function request() { return { type: postConstants.UPLOAD_POST_REQUEST }}
  function success(data) { return { type: postConstants.UPLOAD_POST_SUCCESS, data }}
  function failure(error) { return { type: postConstants.UPLOAD_POST_FAILURE, error }}
};

function getPosts(query) {
  return async (dispatch, getState) => {
    dispatch(request(query));

    try {
      let response = await postService.getPosts(query);

      dispatch(success(response));
    } catch (error) {
      // console.log("error", error)
      dispatch(failure(error))
    }
  };

  function request(query) { return { type: postConstants.GET_POSTS_REQUEST, query }}
  function success(data) { return { type: postConstants.GET_POSTS_SUCCESS, data }}
  function failure(error) { return { type: postConstants.GET_POSTS_FAILURE, error }}
};
