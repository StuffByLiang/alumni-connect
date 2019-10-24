import React from 'react';
import { connect } from 'react-redux';

import { Box, IconButton, Popper, Fade, Paper, Typography, ClickAwayListener, List, ListItem, ListItemText } from '@material-ui/core';
import OptionsIcon from '@material-ui/icons/MoreVert';

import { commentActions } from 'modules/actions';

const CommentOptionsComponent = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  function handleClickAway() {
    setAnchorEl(null);
  };

  function handleDelete() {
    props.deleteComment(props.comment_id);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'popper' : undefined;

  if(props.data.id!==props.user_id) return null;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <OptionsIcon />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List>
                  <ListItem button key="Delete Comment">
                    <ListItemText onClick={handleDelete} primary="Delete Comment" />
                  </ListItem>
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

function mapStateToProps(state) {
  const { loggedIn, data } = state.user;

  return {
    loggedIn,
    data
  }
}

const mapDispatchToProps = {
  deleteComment: commentActions.deleteComment
}

export const CommentOptions = connect(mapStateToProps, mapDispatchToProps)(CommentOptionsComponent);
