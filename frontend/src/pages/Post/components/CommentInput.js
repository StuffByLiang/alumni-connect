import React from 'react';
import { connect } from 'react-redux';
import { commentActions } from 'modules/comment/commentActions.js';

import { Paper, Box, Divider, TextField, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { ProfilePicture, Time } from 'components/';


export const CommentInputComponent = (props) => {
  let { post } = props;

  function onCommentChange(e) {
    let {value} = e.target;
    let post_id = e.target.getAttribute("post_id");
    let replyTo_comment_id = e.target.getAttribute("replyTo_comment_id");

    props.handleCommentChange(post_id, value, replyTo_comment_id);
  }

  function handleSendComment(post_id) {
    let query = props.drafts.byId[post_id];
    query.post_id = post_id;

    props.uploadComment(query);
  }

  return (
    <Box className="comment-input-container" display="flex" flexDirection="row" alignItems="center">
      <ProfilePicture size="small" image_path={post.user.image_path} />
      <Box className="comment-input" flex="auto"><TextField inputProps={{post_id: post.id}} className="small" onBlur={onCommentChange} fullWidth multiline rowsMax={6} label="Comment" name="comment" type="text" /></Box>
      <IconButton post_id={post.id} onClick={()=>handleSendComment(post.id)}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

function mapStateToProps(state) {
  const { drafts } = state.comment;
  return {
    drafts
  }
}

const mapDispatchToProps = {
  uploadComment: commentActions.uploadComment,
  handleCommentChange: commentActions.handleCommentChange
}

export const CommentInput = connect(mapStateToProps, mapDispatchToProps)(CommentInputComponent);
