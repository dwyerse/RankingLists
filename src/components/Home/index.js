import React, { Component } from "react";
import { withAuthorization } from "../Session";
import ListCreate from "../ListCreate";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.lists().on("value", snapshot => {
      const listsList = [];

      snapshot.forEach(element => {
        const obj = { val: element.val(), key: element.key };
        listsList.push(obj);
      });

      this.setState({
        list: listsList,
        loading: false
      });
    });
  }

  render() {
    const { loading, list } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        <p>Create a new list.</p>
        <ListCreate />
        {!loading && (
          <MyList
            isDragDisabled={true}
            deleteActive={false}
            list={list}
            id={"main"}
          />
        )}
      </div>
    );
  }
}

class MyList extends React.Component {
  componentWillReceiveProps() {
    console.log("List " + this.props.list);
  }

  onSubmit = key => {
    console.log(key.val.name + " - pressed");
  };

  render() {
    return (
      <List component="nav" aria-label="main mailbox folders">
        {this.props.list.map(item => (         
          <ListItemLink to={`/list/${item.key}`} primary={item.val.name} />
        ))}
      </List>
    );
  }
}


function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
