import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import ListCreate from '../ListCreate';
import Button from "@material-ui/core/Button";

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
    }
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.lists().on('value', snapshot => {
      const listObj = snapshot.val();
      console.log(listObj)
      const listsList = []

      snapshot.forEach(element => {
        console.log(element.val())
        console.log(element.key)
        const obj = { val: element.val(), key: element.key }
        listsList.push(obj)
      });

      console.log(listsList)

      this.setState({
        list: listsList,
        loading: false,
      });
    });
  }

  render() {
    const { loading, list } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <ListCreate />
        {!loading && <List isDragDisabled={true} deleteActive={false} list={list} id={"main"} />}
      </div>

    );
  }
}


class List extends React.Component {

  componentWillReceiveProps() {
    console.log("List " + this.props.list);
  }

  onSubmit = key => {
    console.log(key + " - pressed")
  };

  render() {
    return (
      <form  onSubmit={this.onSubmit}>
        {this.props.list.map((item) => (
          <Button onClick={() => { this.onSubmit(item.key) }} key={item.key}>{item.val}</Button>
        ))}
      </form>
    );
  }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);