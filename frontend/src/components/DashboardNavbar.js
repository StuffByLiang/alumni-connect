import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';

import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';

import '../scss/dashboardNavbar.scss';

import LogoutButton from './LogoutButton.js'


const DashboardNavbar = ({loggedIn}) => {
  return (
    <div className="dashboard-navbar">
      <AppBar
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            SHAD Connect
          </Typography>
          <Link to="/dashboard/"><Button color="inherit">Home</Button></Link>
          <Link to="/dashboard/sample-page"><Button color="inherit">Sample Page</Button></Link>
          {loggedIn ? (
              <>
                <Link to="/dashboard/profile"><Button color="inherit">Profile</Button></Link>
                <LogoutButton />
              </>
            ) : (
              <Link to="/dashboard/login"><Button color="inherit">Login</Button></Link>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

// const Navbar = () => (
//   <nav>
//     <ul>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/sample-page">Sample Page</Link></li>
//     </ul>
//   </nav>
// );

function mapStateToProps(state) {
  const { loggedIn } = state.users;
  return { loggedIn };
}

export default compose(withRouter, connect(mapStateToProps))(DashboardNavbar);
