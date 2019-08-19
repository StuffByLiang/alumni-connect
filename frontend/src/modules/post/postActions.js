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
      let data = await postService.getPosts(query);

      // convert posts & comment arrays into key-object pairs
      data.posts = data.posts.reduce((newPosts, post) => {
        post.comments = post.comments.reduce((newComments, comment) => {
          newComments.byId[comment.id] = comment;
          return newComments;
        }, { byId: {} } );
        newPosts[post.id] = post;
        return newPosts;
      }, {});

      dispatch(success(data.posts));
    } catch (error) {
      // console.log("error", error)
      dispatch(failure(error))
    }
  };

  function request(query) { return { type: postConstants.GET_POSTS_REQUEST, query }}
  function success(posts) { return { type: postConstants.GET_POSTS_SUCCESS, posts }}
  function failure(error) { return { type: postConstants.GET_POSTS_FAILURE, error }}
};
