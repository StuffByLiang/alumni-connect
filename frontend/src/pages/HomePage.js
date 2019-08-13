import React, { Component } from 'react';

import { Container, Grid, Paper } from '@material-ui/core'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch('/user')
      .then(res => res.json())
      .then(users => {
        this.setState({ users })
      });

    // /users redirects to backend, you can find the json data in /backend/routes/users.js
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Paper className="paper">
              <h1>this is the home page!</h1>
              {this.state.users.map(user =>
                <div key={user.id}>{user.username}</div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default HomePage;
