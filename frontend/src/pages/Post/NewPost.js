import React, { Component } from 'react';

// import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import { Typography, Paper, Container, Grid, Button, CircularProgress, } from '@material-ui/core';

import { postActions } from 'modules/post/postActions';

class NewPost extends Component {
  constructor() {
    super();
    this.state = { group: {} };
    this.quill = null;

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let { group_id } = this.props.match.params;
    let result = await axios.get('/group' , {
      params: {
        id: group_id
      }
    })

    this.setState({group: result.data[0]});

    this.quill = new window.Quill('#editor', {
      theme: 'snow'
    });

  }

  handleClick() {
    const { uploadPost } = this.props;
    const { group_id } = this.props.match.params;

    let content = this.quill.root.innerHTML;

    uploadPost(group_id, content);
  }

  render() {
    // let { id } = this.props.match.params;

    const {
      university,
      year
    } = this.state.group;

    const {
      uploading
    } = this.props;

    return (
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={8} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                New Post
              </Typography>
              <Typography className="subtitle" component="h3">
                {university} {year}
              </Typography>
              <div id="editor"></div>
              <Button onClick={this.handleClick} className="mt-20" variant="contained" size="medium" color="primary">
                Post {uploading && <CircularProgress className="spinner" />}
              </Button>
            </Paper>
          </Grid>
          <Grid item md={4} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                Sidebar
              </Typography>
              {/*<Link to={`/dashboard/groups/${id}/posts/new`}><Button fullWidth variant="contained" size="medium" color="primary">
                Create New Post
              </Button></Link>*/}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { uploading } = state.post;
  return {
    uploading
  }
}

const mapDispatchToProps = {
  uploadPost: postActions.uploadPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
