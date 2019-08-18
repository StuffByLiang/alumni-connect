import React, { Component } from 'react';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { Typography, Paper, Container, Grid, Button, Box, Divider, TextField, IconButton } from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import LikeIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';


import { postActions } from 'modules/post/postActions.js';
import { commentActions } from 'modules/comment/commentActions.js';

import Time from 'components/Time'

class Group extends Component {
  constructor() {
    super();
    this.state = { group: {} };

    this.onCommentChange = this.onCommentChange.bind(this);
    this.handleSendComment = this.handleSendComment.bind(this);
  }

  async componentWillMount() {
    let { id } = this.props.match.params;
    this.props.getPosts({
      group_id: id
    });
    let result = await axios.get('/group' , {
      params: {
        id: id
      }
    })
    this.setState({group: result.data[0]});
  }

  onCommentChange(e) {
    let {value} = e.target;
    let post_id = e.target.getAttribute("post_id");
    let replyTo_comment_id = e.target.getAttribute("replyTo_comment_id");

    this.props.handleCommentChange(post_id, value, replyTo_comment_id);
  }

  handleSendComment(post_id) {
    let query = this.props.writing[post_id];
    query.post_id = post_id;

    this.props.uploadComment(query);
  }

  handleLikeComment() {

  }

  handleReplyComment() {

  }

  render() {
    let { id } = this.props.match.params;

    const {
      university,
      year
    } = this.state.group

    return (
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={8} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                {university} {year}
              </Typography>
            </Paper>
            {this.props.posts.map(post =>
              <Paper post_id={post.id} className="paper mt-20">
                <Box display="flex" flexDirection="row">
                  <div className="image-label medium">
                    <div className="image-container" style={{backgroundImage: `url("/profile-images/${post.user.image_path}")` }}>
                    </div>
                  </div>
                  <div className="user-container">
                    <Link className="user-name" to="">{post.user.firstname + ' ' + post.user.lastname}</Link>
                    <div className="user-title">{post.user.position + ', ' + post.user.company}</div>
                    <div className="user-time"><Time date={post.timestamp}/></div>
                  </div>
                </Box>
                <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: post.post}} />

                <Divider />

                <Box className="comment-input-container" display="flex" flexDirection="row" alignItems="center">
                  <div className="image-label small">
                    <div className="image-container" style={{backgroundImage: `url("/profile-images/${post.user.image_path}")` }}>
                    </div>
                  </div>
                  <Box className="comment-input" flex="auto"><TextField inputProps={{post_id: post.id}} className="small" onBlur={this.onCommentChange} fullWidth multiline rowsMax={6} label="Comment" name="comment" type="text" /></Box>
                  <IconButton post_id={post.id} onClick={()=>this.handleSendComment(post.id)}>
                    <SendIcon />
                  </IconButton>
                </Box>

                {post.comments.map(comment =>
                  <>
                  <Box className="comment-container" display="flex" flexDirection="row" alignItems="flex-start">
                    <div className="image-label small">
                      <div className="image-container" style={{backgroundImage: `url("/profile-images/${comment.user.image_path}")` }}>
                      </div>
                    </div>
                    <Box className="comment-input" flex="auto">
                      <Link className="user-name" to="">{comment.user.firstname + ' ' + comment.user.lastname}</Link>
                      <div className="user-title">{comment.user.position + ', ' + comment.user.company}</div>
                      <div className="user-time"><Time date={comment.timestamp}/></div>
                      <div className="comment-body">{comment.comment}</div>
                    </Box>
                  </Box>
                  <div className="comment-footer">
                    <span post_id={comment.id} onClick={()=>this.handleLikeComment(comment.id)}>
                      <LikeIcon /> Like
                    </span>
                    <span post_id={comment.id} onClick={()=>this.handleReplyComment(comment.id)}>
                      <ReplyIcon /> Reply
                    </span>
                  </div>
                  </>
                )}

              </Paper>
            )}
          </Grid>
          <Grid item md={4} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                Sidebar
              </Typography>
              <Link to={`/dashboard/groups/${id}/posts/new`}><Button fullWidth variant="contained" size="medium" color="primary">
                Create New Post
              </Button></Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { loading, posts } = state.post;
  const { comments, writing } = state.comment;
  return {
    loading,
    posts,
    comments,
    writing
  }
}

const mapDispatchToProps = {
  getPosts: postActions.getPosts,
  uploadComment: commentActions.uploadComment,
  handleCommentChange: commentActions.handleCommentChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Group);
