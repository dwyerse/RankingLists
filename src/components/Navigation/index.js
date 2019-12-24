import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  padding: 15
};

const listItem = {
  textAlign: "center"
};

const textColor = {
  fontSize: 17,
  fontFamily: "quicksand"
};

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? NavigationAuth(authUser) : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = authUser => (
  <List style={flexContainer} component="nav">
    <ListItem style={listItem} button component={Link} to={ROUTES.HOME}>
      <ListItemText
        primary={<Typography style={textColor}>Home</Typography>}
      ></ListItemText>
    </ListItem>
    <ListItem style={listItem} button component={Link} to={ROUTES.ACCOUNT}>
      <ListItemText
        primary={<Typography style={textColor}>{authUser.email}</Typography>}
      ></ListItemText>
    </ListItem>
    <ListItem style={listItem} button component={Link} to={ROUTES.ADMIN}>
      <ListItemText
        primary={<Typography style={textColor}>Admin</Typography>}
      ></ListItemText>
    </ListItem>
    <SignOutButton />
  </List>
);

const NavigationNonAuth = () => (

<List style={flexContainer} component="nav">
    <ListItem style={listItem} button component={Link} to={ROUTES.LANDING}>
      <ListItemText
        primary={<Typography style={textColor}>Home</Typography>}
      ></ListItemText>
    </ListItem>
    <ListItem style={listItem} button component={Link} to={ROUTES.SIGN_IN}>
      <ListItemText
        primary={<Typography style={textColor}>Sign In</Typography>}
      ></ListItemText>
    </ListItem>   
  </List>

);

export default Navigation;
