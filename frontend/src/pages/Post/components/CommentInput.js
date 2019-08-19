import React from 'react';
import { connect } from 'react-redux';
import { commentActions } from 'modules/comment/commentActions.js';

import { Paper, Box, Divider, TextField, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { ProfilePicture, Time } from 'components/';


export const CommentInputComponent = (props) => {
  let { image_path, post_id, replyTo_comment_id, firstLevelCommentId } = props;

  const isCommentReply = replyTo_comment_id===null ? false : true; // is this comment replying to another comment?

  function onCommentChange(e) {
    let {value} = e.target;

    props.handleCommentChange(post_id, value, replyTo_comment_id, firstLevelCommentId);
  }

  function handleSendComment() {
    let query = props.query;
    // console.log(query);

    props.uploadComment(query);
  }

  return (
    <Box className="comment-input-container" display="flex" flexDirection="row" alignItems="center">
      <ProfilePicture size="small" image_path={image_path} />
      <Box className="comment-input" flex="auto"><TextField inputProps={{post_id: post_id}} className="small" onBlur={onCommentChange} fullWidth multiline rowsMax={6} label="Comment" name="comment" type="text" /></Box>
      <IconButton onClick={handleSendComment}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

function mapStateToProps(state, ownProps) {
  const isCommentReply = ownProps.replyTo_comment_id ? true : false; // is this comment replying to another comment?
  const { image_path } = state.user.data;

  let query;
  if(isCommentReply) query = state.comment.commentDrafts.byCommentId[ownProps.replyTo_comment_id];
  else query = state.comment.commentDrafts.byPostId[ownProps.post_id];

  return {
    query,
    image_path,
  };
}

const mapDispatchToProps = {
  uploadComment: commentActions.uploadComment,
  handleCommentChange: commentActions.handleCommentChange
}

export const CommentInput = connect(mapStateToProps, mapDispatchToProps)(CommentInputComponent);
