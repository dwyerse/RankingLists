import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "@material-ui/core/Button";

class ListCreate extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = event => {
        event.preventDefault();
        var key = this.props.firebase.newItemList();

    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <Button variant="outlined" color="primary" type="submit">
                        Create new list
                    </Button>
                </div>
            </form>
        );
    }
}

export default withFirebase(ListCreate);