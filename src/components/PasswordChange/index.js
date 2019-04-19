import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const container = {
  display: 'block',
}

const textField = {
  margin: 10
}

const resetStyle = {
  margin: 10,
}

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

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form style={container} onSubmit={this.onSubmit}>
        <div>
          <TextField
            variant="outlined"
            name="passwordOne"
            label="New password"
            value={passwordOne}
            style={textField}
            onChange={this.onChange}
            type="password"
          />
        </div>
        <div>
          <TextField
            name="passwordTwo"
            variant="outlined"
            value={passwordTwo}
            style={textField}
            onChange={this.onChange}
            type="password"
            label="Confirm New Password"
          />
        </div>

        <div>
          <Button style={resetStyle} variant="outlined" color="primary" disabled={isInvalid} type="submit">
            Reset My Password
        </Button></div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);