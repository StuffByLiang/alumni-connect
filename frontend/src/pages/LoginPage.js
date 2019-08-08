import React, { Component } from 'react';

import { Link, withRouter } from "react-router-dom";

import axios from 'axios';

import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import '../scss/loginPage.scss';

class LoginPage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {
        success: null,
        message: null
      }
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { loginInfo, password } = event.target.elements;
    const data = {
      loginInfo: loginInfo.value,
      password: password.value
    }

    this.setState({
      data: {
        success: null,
        message: null
      }
    })

    let res = await axios.post("/user/login", data);
    this.setState({
      data: res.data
    });
    if(res.data.success) {
      console.log(res.data);
      this.props.history.push('profile');
    }

  }

  render() {
    let messageClass = '';
    if(this.state.data.success !== null) {
      messageClass = this.state.data.success ? 'success' : 'error'; // either error or success
    }

    return (
      <Container id="loginPage" component="main" maxWidth="sm">
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography className="title" component="h1" variant="h5">
            Log in
          </Typography>

          <div className={`message ${messageClass}`}>
            {this.state.data.message}
          </div>

          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="loginInfo"
              label="Username or Email"
              name="loginInfo"
              autoComplete="current-loginInfo"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(LoginPage);
