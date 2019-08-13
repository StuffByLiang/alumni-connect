import React, { Component } from 'react';

// import { Link } from "react-router-dom";

import { Typography, Paper, Container, Grid } from '@material-ui/core';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = { user: {} };
  }

  componentDidMount() {
    fetch('/user/get')
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch(err => console.log(err))

    // /users redirects to backend, you can find the json data in /backend/routes/users.js
  }

  render() {
    // const { classes } = this.props;
    return (
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={4} >
            <Paper className="paper">
              <Typography className="title" component="h2">
              Your Profile!
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={8} >
            <Paper className="paper">
              {JSON.stringify(this.state.user)}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ProfilePage;
