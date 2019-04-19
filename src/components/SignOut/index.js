import React from 'react';

import { withFirebase } from '../Firebase/context';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const listItem = {
  textAlign: 'center',
};

const textColor = {
  fontSize: 16,
  fontFamily: 'quicksand'
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

const noPad = {
  padding: '0px'
}

class SimpleModalWrapped extends React.Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <ListItem style={noPad}>
        <ListItem style={listItem} button onClick={this.handleOpen}>
          <ListItemText primary={<Typography style={textColor}>Sign Out</Typography>}></ListItemText>
        </ListItem>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Are you sure you want to sign out?
            </Typography>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.props.firebase.doSignOut}>Sign Out</Button>
          </div>
        </Modal>
      </ListItem>

    )
  }
}

const SignOutButton = withStyles(styles)(SimpleModalWrapped);


export default withFirebase(SignOutButton);