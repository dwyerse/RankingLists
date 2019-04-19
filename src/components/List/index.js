import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './index.css';
import Button from "@material-ui/core/Button";
import Zoom from '@material-ui/core/Zoom';
import { withFirebase } from '../Firebase';
import ListAdd from '../ListAdd';

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
  borderRadius: '5px',
  border: isDragging ? '1px solid #ff4400' : '1px solid #888888',
  ...draggableStyle
});

const getListStyle = isDragDisabled => ({
  padding: grid,
  width: '40%',
  borderRadius: '5px',
  border: isDragDisabled ? '1px solid #888888' : '1px dashed #ff4400'
});

const editStyle = {
  padding: grid,
  marginRight: 10,
  marginBottom: 10
}

const hidden = {
  display: 'none'
}

const indexStyle= {
  float:'left'
}

class ListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDragDisabled: true,
      isHidden: true,
      loading: false,
      list: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.items().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      console.log(usersList)

      this.setState({
        list: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }


  toggleEdit = () => {
    this.setState(state => ({
      isDragDisabled: !state.isDragDisabled,
      isHidden: !state.isHidden
    }));
  }

  render() {
    const { isDragDisabled, isHidden, loading, list } = this.state;

    return (
      <div className='rowC'>
        {loading && <div>Loading ...</div>}

        <Zoom in={isHidden}>
          <Button variant="outlined" onClick={this.toggleEdit} color="primary" style={isHidden ? editStyle : hidden}>
            Edit
          </Button>
        </Zoom>
        <Zoom in={!isHidden}>
          <Button variant="outlined" onClick={this.toggleEdit} color="primary" style={!isHidden ? editStyle : hidden}>
            Cancel
          </Button>
        </Zoom>
        <Zoom in={!isHidden}>
          <Button variant="outlined" onClick={this.toggleEdit} color="secondary" style={!isHidden ? editStyle : hidden} >
            Save
          </Button>
        </Zoom>
        {!loading && <List style={getListStyle} isDragDisabled={isDragDisabled} list={list} />}
        <ListAdd/>
      </div>

    )
  }
}

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: props.list
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {

    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    const { items } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(this.props.isDragDisabled)}
            >
              {items.map((item, index) => (
                <ListItem isDragDisabled={this.props.isDragDisabled} key={item.uid} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

}

class ListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Draggable isDragDisabled={this.props.isDragDisabled} draggableId={this.props.item.uid} index={this.props.index}>
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

            <span style={indexStyle}>{this.props.index + 1}</span>  
            <span>{this.props.item.item}</span>  

          </div>
        )}
      </Draggable>

    )
  }
}




export default withFirebase(ListScreen);
