import React, { Component } from 'react';

import { Container } from '@material-ui/core'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch('/user')
      .then(res => res.json())
      .then(users => this.setState({ users }));

    // /users redirects to backend, you can find the json data in /backend/routes/users.js
  }

  render() {
    return (
      <Container maxWidth="lg">
        <h1>this is the home page!</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </Container>
    );
  }
}

export default HomePage;
