import React, { Component } from 'react';

// import { Link } from "react-router-dom";

import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

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
        <h1>Your Profile!</h1>
        {JSON.stringify(this.state.user)}
      </Container>
    );
  }
}

export default withStyles(styles)(ProfilePage);
