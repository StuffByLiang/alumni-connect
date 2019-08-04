import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            SHAD Connect
          </Typography>
          <Link to="/"><Button color="inherit">Home</Button></Link>
          <Link to="/sample-page"><Button color="inherit">Sample Page</Button></Link>
          <Link to="/login"><Button color="inherit">Login</Button></Link>
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

export default Navbar;
