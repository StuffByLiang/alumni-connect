import React from 'react';
import { connect } from 'react-redux';
import { commentActions } from 'modules/actions';

import { Link } from 'react-router-dom';

import { Box, IconButton } from '@material-ui/core';

import LikeIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';

import { ProfilePicture, Time } from 'components/';

import { CommentInput, CommentOptions } from './';


const CommentComponent = (props) => {

  let { comment, commentState, toggleCommentReply, level } = props;

  const replyTo_comment_id = comment.id;

  // if level is 2, then the first level coment will be the comment that this comment has replied to.
  const firstLevelCommentId = level===1 ? comment.id : comment.replyTo_comment_id;

  // console.log(commentState);

  function handleLikeComment() {

  }

  function handleReplyComment() {
    toggleCommentReply(comment);
  }

  function handleMore() {

  }

  return (
    <>
    <Box className="comment-container" display="flex" flexDirection="row" alignItems="flex-start">
      <ProfilePicture size="small" image_path={comment.user.image_path} />
      <Box flex="auto">
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          <Box flex="auto">
            <Link className="user-name" to="">{comment.user.firstname + ' ' + comment.user.lastname}</Link>
            <div className="user-title">{comment.user.position + ', ' + comment.user.company}</div>
            <div className="user-time"><Time date={comment.timestamp}/></div>
            <div className="comment-body">{comment.comment}</div>
          </Box>
          <CommentOptions comment_id={comment.id} user_id={comment.user.id} />
        </Box>

        <div className="comment-footer">
          <Box className="comment-action" display="inline-flex" post_id={comment.id} onClick={()=>handleLikeComment(comment.id)}>
            <LikeIcon /> Like
          </Box>
          <Box className="comment-action" display="inline-flex" post_id={comment.id} onClick={()=>handleReplyComment(comment.id)}>
            <ReplyIcon /> Reply
          </Box>
        </div>

        {commentState.reply &&
          <CommentInput post_id={comment.post_id} firstLevelCommentId={firstLevelCommentId} replyTo_comment_id={replyTo_comment_id} />
        }

        {comment.replies && Object.keys(comment.replies.byId).map((id) => {
          let reply = comment.replies.byId[id];
          return <Comment level={2} key={reply.id} comment={reply} />
        })}
      </Box>
    </Box>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  let { post_id, id } = ownProps.comment;
  const commentState = state.comment.commentState.byId[id];
  return {
    commentState
  }
}

const mapDispatchToProps = {
  toggleCommentReply: commentActions.toggleCommentReply
}

export const Comment = connect(mapStateToProps, mapDispatchToProps)(CommentComponent);
