import React, { Component } from 'react';
import './NewTask.css'
import 'bulma/css/bulma.css'
import Clock from './clock';
import Date from './Date'

const toDoTasks = [
  {
    name: 'Click "Create" to create new task',
    completed: false
  },
  {
    name: 'Click "Edit" to edit task',
    completetd: false
  },
  {
    name: 'Click "Delete" to remove task',
    completed: false
  },
  {
    name: "Click on task to mark as complete",
    completed: false
  }
];
class CreateItem extends Component {
  handleCreate(e) {
    e.preventDefault();
    
    if (!this.refs.newItemInput.value) {
      alert('Please enter a task name.');
      return;
    } else if (this.props.toDoTasks.map(element => element.name).indexOf(this.refs.newItemInput.value) !== -1) {
      alert('This task already exists.');
      this.refs.newItemInput.value = '';
      return;
    }
    
    this.props.createItem(this.refs.newItemInput.value);
    this.refs.newItemInput.value = '';
  }
  
  render() {
    return (
      <div className="create-new">
        <form onSubmit={this.handleCreate.bind(this)}>
          <input type="text" placeholder="New Task" ref="newItemInput" />
          <button class="button is-primary">
          <span class="fa fa-plus"></span>
          </button>
        </form>
      </div>
    );
  }
}

class TaskItems extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editing: false
    };
  }
  
  renderName() {
    const itemStyle = {
      'text-decoration': this.props.completed ? 'line-through' : 'none',
      cursor: 'pointer'
    };
    
    if(this.state.editing) {
      return (
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" ref="editInput" defaultValue={this.props.name} />
          </form>
      );
    }
    
    return (
      <span style={itemStyle} onClick={this.props.toggleComplete.bind(this, this.props.name)}>{this.props.name}</span>
    );
  }
  
  renderButtons() {
    if (this.state.editing) {
      return (
        <span>
          <button onClick={this.onSaveClick.bind(this)}>
          <span class="fa fa-save"></span></button>
          <button onClick={this.onCancelClick.bind(this)}><span class="fa fa-window-close"></span></button>
        </span>
      );
    }
    
    return (
      <span>
        <button class="button is-primary" onClick={this.onEditClick.bind(this)}><span class="fa fa-edit"></span></button>
        <button class="button is-danger" onClick={this.props.deleteItem.bind(this, this.props.name)}><span class="fa fa-trash"></span></button>
      </span>
    );
  }
  
  onEditClick() {
    this.setState({ editing: true });
  }
  
  onCancelClick() {
    this.setState({ editing: false });
  }
  
  onSaveClick(e) {
    e.preventDefault();
    this.props.saveItem(this.props.name, this.refs.editInput.value);
    this.setState({ editing: false });
  }
  
  render() {
    return (
      <div className="to-do-item">
        <span className="name">
        {this.renderName()}
        </span>
        <span className="actions">
        {this.renderButtons()}
        </span>
      </div>
    );
  }
}

class ToDoList extends React.Component {
  renderItems() {
    return this.props.toDoTasks.map((item, index) => <TaskItems key={index} {...item} {...this.props} />);
  }
  
  render() {
    return (
      <div className="items-list">
        {this.renderItems()}
      </div>
    );
  }
}

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      toDoTasks
    };
  }
  
  createItem(item) {
    this.state.toDoTasks.unshift({
      name: item,
      completed: false
    });
    this.setState({
      toDoTasks: this.state.toDoTasks
    });
  }
  
  findItem(item) {
    return this.state.toDoTasks.filter((element) => element.name === item)[0];
  }
  
  toggleComplete(item) {
    let selectedItem = this.findItem(item);
    selectedItem.completed = !selectedItem.completed;
    this.setState({ toDoTasks: this.state.toDoTasks });
  }
  
  saveItem(oldItem, newItem) {
    let selectedItem = this.findItem(oldItem);
    selectedItem.name = newItem;
    this.setState({ toDoTasks: this.state.toDoTasks });
  }
  
  deleteItem(item) {
    let index = this.state.toDoTasks.map(element => element.name).indexOf(item);
    this.state.toDoTasks.splice(index, 1);
    this.setState({ toDoTasks: this.state.toDoTasks });
  }
  
  render() {
    return (
      <div className='app'>
      <br />
        <h1>New Task</h1>
                <div>
                 <Date />
                </div>
                <Clock/>
                <br />
                <Clock/>
      <div className="to-do-app">
      
        <div className="header">
        
          <h1>New Task</h1>
        </div>
        <CreateItem toDoTasks={this.state.toDoTasks} createItem={this.createItem.bind(this)} />
        <ToDoList toDoTasks={this.state.toDoTasks} deleteItem={this.deleteItem.bind(this)} saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
      </div>
     
      </div>
    );
  }
}

export default NewTask;
 

