import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.css";
import Button from "@material-ui/core/Button";
import Zoom from "@material-ui/core/Zoom";
import ListAdd from "../ListAdd";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { withAuthorization } from "../Session";
import Comments from "../Comments";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const grid = 7;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: isDragging ? "#ff4400" : "grey",
  background: "white",
  borderRadius: "5px",
  border: isDragging ? "1px solid #ff4400" : "1px solid #888888",
  ...draggableStyle
});

const getPosItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: isDragging ? "#ff4400" : "grey",
  background: "white",
  borderRadius: "5px",
  border: isDragging ? "1px solid #ff4400" : "1px solid #888888",
  ...draggableStyle
});

const getPosListStyle = () => ({
  padding: grid,
  paddingLeft: "0px",
  borderRadius: "5px",
  width: "5%"
});

const getListStyle = isDragDisabled => ({
  padding: grid,
  borderRadius: "5px",
  width: "40%",
  border: isDragDisabled ? "" : "1px dashed #ff4400"
});

const getDeleteStyle = (isDragDisabled, isDraggingOver) => ({
  padding: grid,
  borderRadius: "5px",
  width: "40%",
  border: isDraggingOver
    ? "1px solid red"
    : isDragDisabled
    ? ""
    : "1px solid #888888",
  textAlign: "center",
  marginLeft: "10px"
});

const editStyle = {
  paddingLeft: grid,
  paddingRight: grid,
  width: "40%",
  padding: grid,
  marginBottom: 10,
  marginTop: 10
};

const subButtonStyle = {
  width: "20%",
  padding: grid,
  marginRight: 10,
  marginBottom: 10,
  marginTop: 10
};

const hidden = {
  display: "none"
};

const getIconStyle = (isDragDisabled, isDraggingOver) => ({
  color: isDraggingOver ? "red" : "grey",
  display: isDragDisabled ? "none" : ""
});

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragDisabled: true,
      isHidden: true,
      loading: false,
      list: [],
      listName: ""
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log(this.props);
    this.props.firebase
      .itemsInList(this.props.match.params.listId)
      .on("value", snapshot => {
        const usersObject = snapshot.child("list").val();
        const name = snapshot.child("name").val();
        var usersList = [];
        if (usersObject) {
          usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key
          }));
        }

        this.setState({
          list: usersList,
          listName: name,
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.itemsInList(this.props.match.params.listId).off();
  }

  toggleEdit = () => {
    this.setState(state => ({
      isDragDisabled: !state.isDragDisabled,
      isHidden: !state.isHidden
    }));
  };

  onDone = () => {
    this.toggleEdit();
    this.props.firebase.setItemList(
      this.props.match.params.listId,
      this.state.list
    );
  };

  onDragEnd = result => {
    const { source, destination } = result;

    if (!result.destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(this.state.list, source.index, destination.index);

      this.setState({
        list: items
      });
    } else if (destination.droppableId === "delete") {
      console.log(this.state.list);
      const items = this.state.list;
      items.splice(source.index, 1);
      this.props.firebase.setItemList(this.props.match.params.listId, items);
      this.setState();
    } else {
      console.log("Error");
    }
  };

  render() {
    const { isDragDisabled, isHidden, loading, list } = this.state;
    return (
      <div>
        <h1>{this.state.listName}</h1>
        <ListAdd length={list.length} listId={this.props.match.params.listId} />

        <Zoom in={isHidden}>
          <Button
            variant="outlined"
            onClick={this.toggleEdit}
            color="primary"
            style={isHidden ? editStyle : hidden}
          >
            Edit
          </Button>
        </Zoom>
        <Zoom in={!isHidden}>
          <Button
            variant="outlined"
            onClick={this.onDone}
            color="secondary"
            style={!isHidden ? subButtonStyle : hidden}
          >
            Done
          </Button>
        </Zoom>
        <div className="rowC">
          {loading && <div>Loading ...</div>}
          <DragDropContext onDragEnd={this.onDragEnd}>
            {!loading && (
              <Positions
                style={getPosListStyle}
                isDragDisabled={true}
                deleteActive={false}
                list={list}
              />
            )}
            {!loading && (
              <List
                style={getListStyle}
                isDragDisabled={isDragDisabled}
                deleteActive={false}
                list={list}
                id={"standard"}
              />
            )}
            {!loading && (
              <List
                style={getDeleteStyle}
                isDragDisabled={isDragDisabled}
                deleteActive={true}
                list={[]}
                id={"delete"}
              />
            )}
          </DragDropContext>
        </div>
        <div>
          <Comments />
        </div>
      </div>
    );
  }
}

class Positions extends React.Component {
  render() {
    return (
      <div style={getPosListStyle()}>
        {this.props.list.map((item, index) => (
          <PositionItem
            isDragDisabled={this.props.isDragDisabled}
            key={index}
            item={item}
            index={index}
          />
        ))}
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={this.props.style(
              this.props.isDragDisabled,
              snapshot.isDraggingOver
            )}
          >
            {this.props.list.map((item, index) => (
              <ListItem
                isDragDisabled={this.props.isDragDisabled}
                key={item.uid}
                item={item}
                index={index}
              />
            ))}
            {this.props.deleteActive && (
              <DeleteOutlinedIcon
                style={getIconStyle(
                  this.props.isDragDisabled,
                  snapshot.isDraggingOver
                )}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <Draggable
        isDragDisabled={this.props.isDragDisabled}
        draggableId={this.props.item.uid}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            className="item"
          >
            <span>
              {this.props.item.itemName + " " + (this.props.item.position + 1)}
            </span>
          </div>
        )}
      </Draggable>
    );
  }
}

class PositionItem extends React.Component {
  render() {
    return (
      <div style={getPosItemStyle()} className="item">
        <span>{this.props.index + 1}</span>
      </div>
    );
  }
}
const condition = authUser => !!authUser;

export default withAuthorization(condition)(ListScreen);
