import React, { Component } from 'react';

import {connect} from 'react-redux';

import TextField from '@material-ui/core/TextField';

import { profileActions } from 'modules/profile/profileActions';

class PlaceInput extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    const google = window.google;
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {
          types: ["geocode"],
          // componentRestrictions: {country: 'ca'}
        }
      );

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    // const place = this.autocomplete.getPlace();
    const {name, value} = this.autocompleteInput.current;
    this.props.handleChange(name, value);
    // this.props.onChange(this.autocompleteInput.current);
  }

  render() {
    return (
      <TextField onChange={this.props.handlePlaceChanged} defaultValue={this.props.defaultValue} fullWidth inputRef={this.autocompleteInput} type="text" label="Location" name="location" />
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     location: state.profile.currentUserData.location
//   };
// }

const mapDispatchToProps = {
  handleChange: profileActions.handleChange
}

export default connect(null, mapDispatchToProps)(PlaceInput);
