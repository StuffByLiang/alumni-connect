import React, { Component } from 'react';

// import { Link } from "react-router-dom";

import { connect } from 'react-redux';
// import { compose } from 'redux';

import {
  Typography,
  Paper,
  Container,
  Grid,
} from '@material-ui/core';

import EditProfileInputs from '../components/EditProfileInputs';


class EditProfilePage extends Component {

  render() {
    return (
      <Container className="" component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <Paper className="paper">
              <Typography className="title" component="h2">
              Your Profile!
              </Typography>
              {this.props.data&&
                <EditProfileInputs />
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.user.data
  };
}

export default connect(mapStateToProps)(EditProfilePage);
