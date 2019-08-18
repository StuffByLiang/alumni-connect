import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import MenuIcon from '@material-ui/icons/Menu';

import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';

import LogoutButton from 'components/LogoutButton.js'


const DefaultNavbar = ({loggedIn}) => {
  return (
    <div className="default-navbar">
      <AppBar
        position="static"
        elevation={0}
      >
        <Toolbar>
          <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            SHAD Connect
          </Typography>
          <Link to="/"><Button color="inherit">Home</Button></Link>
          {loggedIn ? (
              <>
                <Link to="/dashboard/profile"><Button color="inherit">Profile</Button></Link>
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
  const { loggedIn } = state.user;
  return { loggedIn };
}

export default compose(withRouter, connect(mapStateToProps))(DefaultNavbar);
