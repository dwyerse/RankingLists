import React, { Component, FlatList } from "react";
import { withFirebase } from "../../Firebase";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
class Comment extends Component {
  render() {
    return (
      <ListItem alignItems="flex-start" key={this.props.key}>
        <ListItemText
          primary={this.props.item.user}
          secondary={this.props.item.text}
        />
        <IconButton>
          <ReplyIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </ListItem>
    );
  }
}

export default withFirebase(Comment);
