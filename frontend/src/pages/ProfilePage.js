import React, { Component } from 'react';

// import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import { Typography, Paper, Container, Grid, Box } from '@material-ui/core';

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
    const {
      age,
      company,
      description,
      email,
      facebook,
      firstname,
      image_path,
      industry,
      instagram,
      lastname,
      location,
      phone,
      position,
      province,
      school,
      snapchat,
      website,
    } = this.props.userData;

    let image = "";
    if(image_path) {
      image = `/profile-images/${image_path}`;
    }


    return (
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item md={8} >
            <Paper className="paper">
              <Typography className="title" component="h2">
                Your Profile!
              </Typography>
              <Box display="flex" p={1} flexDirection="row">
                <div className="image-label mr-20">
                  <div className="image-container" style={{backgroundImage: `url("${image}")` }}>
                  </div>
                </div>
                <div>
                  <Typography className="" component="p">
                    {firstname + ' ' + lastname}
                  </Typography>
                  <Typography className="" component="p">
                    {position + ' at ' + company}
                  </Typography>
                  <Typography className="" component="p">
                    {industry}
                  </Typography>
                  <Typography className="" component="p">
                    School: {school}
                  </Typography>
                  <Typography className="" component="p">
                    {province}
                  </Typography>
                  <a href={website} target="_blank">{website}</a>
                </div>
              </Box>
            </Paper>
            <Paper className="paper mt-20">
              <Typography className="title" component="h2">
                Summary
              </Typography>
              <Typography className="pre" component="p">
                {description}
              </Typography>
            </Paper>
            <Paper className="paper mt-20">
              <Typography className="title" component="h2">
                Contact Info
              </Typography>
              <Typography className="pre" component="p">
                Phone: {phone}
              </Typography>
              <Typography className="pre" component="p">
                Email: {email}
              </Typography>
              <Typography className="pre" component="p">
                Facebook: <a href={facebook} target="_blank">{firstname} {lastname}</a>
              </Typography>
              <Typography className="pre" component="p">
                Instagram: {instagram}
              </Typography>
              <Typography className="pre" component="p">
                Snapchat: {snapchat}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={4} >
            <Paper className="paper">
              <Grid container spacing={2} >
                <Grid item md={12}>
                  <Typography component="body">
                  {JSON.stringify(this.state.user)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  let { data } = state.user;
  if(!data) data = {};
  return {
    userData: data,
  }
}

export default connect(mapStateToProps)(ProfilePage);
