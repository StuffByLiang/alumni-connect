import React from 'react';
import { Link } from 'react-router-dom';

import { Box, IconButton } from '@material-ui/core';

import LikeIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';

import { ProfilePicture, Time } from 'components/';


export const Comment = ({comment}) => {
  return (
    <>
    <Box className="comment-container" display="flex" flexDirection="row" alignItems="flex-start">
      <ProfilePicture size="small" image_path={comment.user.image_path} />
      <Box className="" flex="auto">
        <Link className="user-name" to="">{comment.user.firstname + ' ' + comment.user.lastname}</Link>
        <div className="user-title">{comment.user.position + ', ' + comment.user.company}</div>
        <div className="user-time"><Time date={comment.timestamp}/></div>
        <div className="comment-body">{comment.comment}</div>

        <div className="comment-footer">
          <Box className="comment-action" display="inline-flex" post_id={comment.id} onClick={()=>this.handleLikeComment(comment.id)}>
            <LikeIcon /> Like
          </Box>
          <Box className="comment-action" display="inline-flex" post_id={comment.id} onClick={()=>this.handleReplyComment(comment.id)}>
            <ReplyIcon /> Reply
          </Box>
        </div>
      </Box>
    </Box>
    </>
  );
}
