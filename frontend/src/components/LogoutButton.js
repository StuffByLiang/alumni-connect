import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Button } from '@material-ui/core'

import { userActions } from 'modules/user/userActions.js';

const LogoutButton = ({ logout }) => {
  return(
    <Button color="inherit" onClick={logout}>Logout</Button>
  )
}

const mapDispatchToProps = {
  logout: userActions.logout,
}

export default compose(withRouter, connect(null, mapDispatchToProps))(LogoutButton);
