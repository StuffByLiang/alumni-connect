import React from 'react';
import { connect } from 'react-redux';
import { commentActions } from 'modules/comment/commentActions.js';

import { Link } from 'react-router-dom';

import { Paper, Box, Divider, TextField, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { ProfilePicture, Time } from 'components/';
import { Comment, CommentInput } from './';

const PostComponent = (props) => {
  let { post } = props;

  return (
    <Paper post_id={post.id} className="paper mt-20">
      <Box display="flex" flexDirection="row">
        <ProfilePicture size="medium" image_path={post.user.image_path} />
        <div className="user-container">
          <Link className="user-name" to="">{post.user.firstname + ' ' + post.user.lastname}</Link>
          <div className="user-title">{post.user.position + ', ' + post.user.company}</div>
          <div className="user-time"><Time date={post.timestamp}/></div>
        </div>
      </Box>
      <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: post.post}} />

      <Divider />

      <CommentInput post={post} />

      {Object.keys(post.comments.byId).map((id) => {
        let comment = post.comments.byId[id];
        return <Comment key={comment.id} comment={comment} />
      })}

    </Paper>
  );
};

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

export const Post = connect(mapStateToProps, mapDispatchToProps)(PostComponent);
