import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import axios from 'axios';

import MenuIcon from '@material-ui/icons/Menu';

import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';

import '../scss/navBar.scss';


const Navbar = props => {
  async function logOut() {
    await axios.get('/user/logout');
    props.history.push("/");

  };

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
          <Link to="/login"><Button color="inherit">Login</Button></Link>
          <Link to="/profile"><Button color="inherit">Profile</Button></Link>
          <Button color="inherit" onClick={() => logOut()}>Logout</Button>
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

export default withRouter(Navbar);
