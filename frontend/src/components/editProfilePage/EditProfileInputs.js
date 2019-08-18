import React, { Component } from 'react';

// import { Link } from "react-router-dom";

import { connect } from 'react-redux';
// import { compose } from 'redux';

import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import PlaceInput from 'components/editProfilePage/PlaceInput';
import ImageInput from 'components/editProfilePage/ImageInput';

import { profileActions } from 'profile/profileActions.js';



class EditProfileInputs extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let {name, value} = e.target;
    if(e.target.type === 'number') {
      value = Number(value);
    }
    this.props.handleChange(name, value);
  }

  componentWillUnmount() {
    this.props.handleChange('province', null);
  }

  render() {
    // if anything is changed, change them in display
    for(var i in this.props.changes) {
      console.log(i);
      this.props.userData[i] = this.props.changes[i];
    }
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
    return (
      <>
        <ImageInput defaultValue={image_path} />
        <Grid container spacing={2} >
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={firstname} inputProps={{ maxLength: 12 }} fullWidth label="First Name" name="firstname" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={lastname} fullWidth label="Last Name" name="lastname" />
          </Grid>
          <Grid item md={1}>
            <TextField onBlur={this.onChange} defaultValue={age} fullWidth label="Age" name="age" type="number"
              InputProps={{ inputProps: { min: 0, max: 120 } }}
            />
          </Grid>
          <Grid item md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="province">Province</InputLabel>
                <Select
                  value={this.props.changes.province ? this.props.changes.province : province}
                  onChange={this.onChange}
                  inputProps={{
                    name: 'province',
                    id: 'province',
                  }}
                >
                <MenuItem value="BC">British Columbia</MenuItem>
                <MenuItem value="AB">Alberta</MenuItem>
                <MenuItem value="ON">Ontario</MenuItem>
                <MenuItem value="QC">Quebec</MenuItem>
                <MenuItem value="MB">Manitoba</MenuItem>
                <MenuItem value="SK">Saskatchewan</MenuItem>
                <MenuItem value="NS">Nova Scotia</MenuItem>
                <MenuItem value="NB">New Brunswick</MenuItem>
                <MenuItem value="NL">Newfoundland and Labrador</MenuItem>
                <MenuItem value="PE">Prince Edward Island</MenuItem>
                <MenuItem value="NT">Northwest Territories</MenuItem>
                <MenuItem value="YT">Yukon</MenuItem>
                <MenuItem value="NU">Nunavut</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <TextField onBlur={this.onChange} defaultValue={school} fullWidth label="School" name="school" />
          </Grid>
          <Grid item md={6}>
            <PlaceInput defaultValue={location} onBlur={this.onChange} />
          </Grid>

          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={phone} fullWidth label="Phone Number" name="phone" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={email} fullWidth label="E-mail" name="email" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={website} fullWidth label="Website" name="website" />
          </Grid>
          <Grid item md={12}>
            <TextField onBlur={this.onChange} defaultValue={description} fullWidth multiline rows="6" label="Short Description" name="description" />
          </Grid>

          <Grid item md={12}>
            <Typography className="title mt-20" component="h3">
              Career Information
            </Typography>
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={company} fullWidth label="Company Name" name="company" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={position} fullWidth label="Job Title/Position" name="position" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={industry} fullWidth label="Industry" name="industry" />
          </Grid>

          <Grid item md={12}>
            <Typography className="title mt-20" component="h3">
              Social Media
            </Typography>
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={facebook} fullWidth label="Facebook Profile Link" name="facebook" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={instagram} fullWidth label="Instagram Handle" name="instagram" />
          </Grid>
          <Grid item md={4}>
            <TextField onBlur={this.onChange} defaultValue={snapchat} fullWidth label="Snapchat Username" name="snapchat" />
          </Grid>

          <Grid item md={12}>
            <Button onClick={this.props.saveChanges} variant="contained" size="large" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    changes: state.profile.changes,
    userData: state.user.data === null ? {} : state.user.data,
  };
}

const mapDispatchToProps = {
  handleChange: profileActions.handleChange,
  saveChanges: profileActions.saveChanges,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileInputs);
