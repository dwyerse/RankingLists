import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const textField = {
  margin: 10
};

const resetStyle = {
  margin: 10
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 0.5 }}>
        <TextField
          variant="outlined"
          name="passwordOne"
          label="New password"
          value={passwordOne}
          style={textField}
          onChange={this.onChange}
          type="password"
        />
        <TextField
          name="passwordTwo"
          variant="outlined"
          value={passwordTwo}
          style={textField}
          onChange={this.onChange}
          type="password"
          label="Confirm New Password"
        />

        <Button
          style={resetStyle}
          variant="outlined"
          color="primary"
          disabled={isInvalid}
          type="submit"
        >
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
