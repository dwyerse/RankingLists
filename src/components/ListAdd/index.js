import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const INITIAL_STATE = {
    item: '',
    error: null,
};

const container = {
    display: 'block',
}

const textField = {
    marginTop: 10
}

const resetStyle = {
    marginTop: 10,
}

class ListAdd extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

        event.preventDefault();
        const { item } = this.state;
        this.props.firebase.pushData(item)

    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { item, error } = this.state;

        const isInvalid = item === '';

        return (
            <form style={container} onSubmit={this.onSubmit}>
                <div>
                    <TextField
                        variant="outlined"
                        name="item"
                        label="New item"
                        style={textField}
                        onChange={this.onChange}
                    />
                </div>

                <div>
                    <Button style={resetStyle} variant="outlined" color="primary" disabled={isInvalid} type="submit">
                        Add item
                    </Button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withFirebase(ListAdd);