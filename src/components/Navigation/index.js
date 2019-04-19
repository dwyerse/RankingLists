import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  padding: 15,
};

const listItem = {
  textAlign: 'center',
};

const textColor = {
  fontSize: 17,
  fontFamily:'quicksand'
}

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <List style={flexContainer} component="nav">
    <ListItem style={listItem} button component={Link} to={ROUTES.HOME}>
      <ListItemText primary={<Typography style={textColor}>Predict</Typography>}></ListItemText>
    </ListItem>
    <ListItem style={listItem} button component={Link} to={ROUTES.LIST}>
      <ListItemText primary={<Typography style={textColor}>List</Typography>}></ListItemText>
    </ListItem>
    <ListItem style={listItem} button component={Link} to={ROUTES.ACCOUNT}>
      <ListItemText primary={<Typography style={textColor}>Account</Typography>}></ListItemText>
    </ListItem>
    <ListItem style={listItem} button component={Link} to={ROUTES.ADMIN}>
      <ListItemText primary={<Typography style={textColor}>Admin</Typography>}></ListItemText>
    </ListItem>
    <SignOutButton />
  </List>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;