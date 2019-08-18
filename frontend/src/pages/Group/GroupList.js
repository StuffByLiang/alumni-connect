import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import { Typography, Paper, Container, Grid } from '@material-ui/core';

class GroupList extends Component {
  constructor() {
    super();
    this.state = { groups: [] };
  }

  componentDidMount() {
    fetch('/group')
      .then(res => res.json())
      .then(groups => this.setState({ groups }))
      .catch(err => console.log(err))
    }

  render() {

    return (
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={12} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                All Groups
              </Typography>
              {this.state.groups.map(group =>
                <div>
                  <Link to={`/dashboard/groups/${group.id}`}>{group.university} {group.year}</Link>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(GroupList);
