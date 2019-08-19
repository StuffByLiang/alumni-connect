import React, { Component } from 'react';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { Typography, Paper, Container, Grid, Button } from '@material-ui/core';

import { postActions } from 'modules/post/postActions.js';
import { commentActions } from 'modules/comment/commentActions.js';

import { Post } from 'pages/Post/components';

class Group extends Component {
  constructor() {
    super();
    this.state = { group: {} };
  }

  async componentWillMount() {
    let { group_id } = this.props.match.params;
    this.props.getPosts({
      group_id: group_id
    });
    let result = await axios.get('/group' , {
      params: {
        id: group_id
      }
    })
    this.setState({group: result.data[0]});
  }

  handleLikeComment() {

  }

  handleReplyComment() {

  }

  render() {
    let { group_id } = this.props.match.params;

    const {
      university,
      year
    } = this.state.group

    let { posts } = this.props;

    return (
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={8} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                {university} {year}
              </Typography>
            </Paper>
            {Object.keys(posts.byId).map((id) => {
              let post = posts.byId[id];
              return <Post key={post.id} post={post} />
            })}
          </Grid>
          <Grid item md={4} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                Sidebar
              </Typography>
              <Link to={`/dashboard/groups/${group_id}/posts/new`}><Button fullWidth variant="contained" size="medium" color="primary">
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
