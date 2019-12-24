import React, { Component } from "react";
import Comment from "./Comment";
import { withAuthorization } from "../Session";
import AddComment from "./AddComment";
import List from "@material-ui/core/List";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.firebase
      .comments(this.props.match.params.listId)
      .on("value", snapshot => {
        const comments = snapshot.val();
        console.log(comments);
        
        this.setState({
          list: comments?comments:[],
          loading: false
        });
      });
  }
  commentList = () => {
    return this.props.list.map((item, index) => (
      <Comment item={item} index={index} />
    ));
  };

  render() {
    const { loading, list } = this.state;

    return (
      <div>
        <h3>Comments</h3>
        {loading && <div>Loading ...</div>}
        {!loading && <AddComment />}
        <List>
          {Object.keys(list).map(function(keyName, keyIndex) {
            console.log(keyName);
            return <Comment item={list[keyName]} key={keyName} />;
          })}
        </List>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Comments);
