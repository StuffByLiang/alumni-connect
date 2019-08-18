import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const SideNav = () => {
  return (
    <Drawer
      className="side-nav"
      variant="permanent"
      anchor="left"
    >
      <div className="toolbar" />
      <Divider />
      <List>
        <Link className="reset-link" to="/dashboard/profile/edit"><ListItem button key="Edit Profile">
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem></Link>
        <Link className="reset-link" to="/dashboard/groups"><ListItem button key="Edit Profile">
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary="All Groups" />
        </ListItem></Link>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
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
  return {};
}

export default compose(withRouter, connect(mapStateToProps))(SideNav);
