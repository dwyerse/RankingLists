import React, { Component } from "react";
import { withAuthorization } from "../../Session";
import { TextField, Button } from "@material-ui/core";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isInvalid: true
    };
  }

  addComment = () => {
    var comment = {
      text: this.state.value,
      time: new Date().toDateString(),
      user: "placeholder"
    };

    this.props.firebase.addComment(this.props.match.params.listId, comment);
    this.setState({
      value: ""
    });
  };

  onChange = text => {
    console.log(text.target.value);
    this.setState({
      value: text.target.value
    });
  };

  render() {
    const{value} = this.state;
    const isInvalid = value === '';

    return (
      <div style={{ display: "flex" }}>
        <TextField
          style={{ marginRight: 10 }}
          variant="outlined"
          label="Add Comment..."
          value={value}
          onChange={this.onChange}
        ></TextField>
        <Button
          variant="outlined"
          onClick={this.addComment}
          disabled={isInvalid}
          type="submit"
        >
          Post Comment
        </Button>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddComment);
