import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

const INITIAL_STATE = {
    itemName: '',
    itemValue: '',
    error: null,
};

const container = {
    display: 'flex',
}

const addStyle = {
    height: "100%",
    marginLeft: '10px'
}

class ListAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();
        const { itemValue } = this.state;
        this.props.firebase.addItem(this.props.listId,itemValue, this.props.length);
        this.setState({
            itemValue:""
        })
    };

    onChange = event => {
        this.setState({ itemValue: event.target.value });
    };

    render() {
        const { itemValue, error } = this.state;
        const isInvalid = itemValue === '';

        return (
            <form style={container} onSubmit={this.onSubmit}>
                <div>
                    <TextField
                        variant="outlined"
                        name="itemName"
                        label="New Item"
                        value={this.state.itemValue}
                        onChange={this.onChange}
                    />
                    <Button style={addStyle} variant="outlined" color="primary" disabled={isInvalid} type="submit">
                        Add item
                    </Button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withFirebase(ListAdd);