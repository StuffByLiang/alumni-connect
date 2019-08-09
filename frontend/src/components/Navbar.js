import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';

import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';

import '../scss/navBar.scss';

import LogoutButton from './LogoutButton.js'


const Navbar = ({loggedIn}) => {
  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            SHAD Connect
          </Typography>
          <Link to="/"><Button color="inherit">Home</Button></Link>
          <Link to="/sample-page"><Button color="inherit">Sample Page</Button></Link>
          {loggedIn ? (
              <>
                <Link to="/profile"><Button color="inherit">Profile</Button></Link>
                <LogoutButton />
              </>
            ) : (
              <Link to="/login"><Button color="inherit">Login</Button></Link>
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

export default compose(withRouter, connect(mapStateToProps))(Navbar);
