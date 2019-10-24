import { commentService } from './commentService.js';
import { commentConstants } from './commentConstants.js';

import { postActions } from 'modules/actions';

export const commentActions = {
    uploadComment,
    getComments,
    handleCommentChange,
    commentInit,
    toggleCommentReply,
    deleteComment
};

function handleCommentChange(post_id, comment, replyTo_comment_id=null, firstLevelCommentId=null) {
  return (dispatch) => dispatch({
    type: commentConstants.COMMENT_CHANGE,
    post_id,
    replyTo_comment_id,
    comment,
    firstLevelCommentId
  })
}

function uploadComment(query) {
  if(query.replyTo_comment_id===null) delete query.replyTo_comment_id;
  return async (dispatch, getState) => {
    dispatch(request(query));

    try {
      let response = await commentService.uploadComment(query);

      dispatch(success(response));
      window.location.reload(); // RELOAD THE PAGE BABY

    } catch (error) {
      dispatch(failure(error))
    }
  };

  function request(query) { return { type: commentConstants.UPLOAD_COMMENT_REQUEST, query }}
  function success(data) { return { type: commentConstants.UPLOAD_COMMENT_SUCCESS, data }}
  function failure(error) { return { type: commentConstants.UPLOAD_COMMENT_FAILURE, error }}
};

function getComments(query) {
  return async (dispatch, getState) => {
    dispatch(request(query));

    try {
      let response = await commentService.getComments(query);

      dispatch(success(response));
    } catch (error) {
      // console.log("error", error)
      dispatch(failure(error))
    }
  };

  function request(query) { return { type: commentConstants.GET_COMMENTS_REQUEST, query }}
  function success(data) { return { type: commentConstants.GET_COMMENTS_SUCCESS, data }}
  function failure(error) { return { type: commentConstants.GET_COMMENTS_FAILURE, error }}
};

function deleteComment(comment_id) {
  return async (dispatch, getState) => {
    dispatch(request(comment_id));

    try {
      let response = await commentService.deleteComment(comment_id);

      dispatch(success(response));
    } catch (error) {
      // console.log("error", error)
      dispatch(failure(error))
    }
  };

  function request(comment_id) { return { type: commentConstants.DELETE_COMMENT_REQUEST, comment_id }}
  function success(data) { return { type: commentConstants.DELETE_COMMENT_SUCCESS, data }}
  function failure(error) { return { type: commentConstants.DELETE_COMMENT_FAILURE, error }}
};

function commentInit(comment) {
  return (dispatch) => dispatch({
    type: commentConstants.COMMENT_INIT,
    comment_id: comment.id
  })
}

function toggleCommentReply(comment) {
  return (dispatch) => dispatch({
    type: commentConstants.TOGGLE_COMMENT_REPLY,
    comment_id: comment.id
  })
}
