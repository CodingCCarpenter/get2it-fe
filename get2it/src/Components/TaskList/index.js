import React from 'react';
import './style.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { updateTask } from '../../actions'
import { getTASKS, deleteTask } from '../../actions'

// build task component and set up state
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // add tasklist to state
    this.state = {
      taskList: [],
    };
  }
  event;

  // build function to add tasks to state
  createTaskList = event => {
    event.preventDefault();
    // pull tasks from props
    const arrList = this.props.userTasks;
    const list = [];
    var listItem;
    var spacer = "      ";
    // loop through each task and post them to state
    for (let i = 0; i < arrList.length; i++) {
      list.push(arrList[i]);
    }
    console.log(list);
    this.setState({
      taskList: list
    });
  };

  // complete = event => {
  //   if(querySelector(input[type=checkbox]:checked)){
  //     upd()
  //   } else {
  //     check()
  //   }

  deleted = (id) => {
    this.props.deleteTask(id);
    this.setState({
      taskList: this.props.getTASKS(this.props.userData.id)
    })
  };

  // render content to page
  render() {
    var container = document.querySelector('.completeTask');

container.addEventListener('mouseenter', function(){
        this.classList.remove('first');
        this.classList.add('second');
})
container.addEventListener('mouseleave', function(){
        this.classList.add('first');
        this.classList.remove('second');
})
    return (
      <div>
        <Form>
          <Form.Text className="taskTitle">TASK LIST</Form.Text>
        </Form>
        <div className="taskListContainer">
          {/* for each item on the state tasklist create a task link on the page */}
          <ul>
            {this.state.taskList.map((item, index) => (
              <li key={index}>
                <Form>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check onClick={this.complete} type="checkbox" />
                    <Form.Text>{item.name}</Form.Text>
                    <Button
                      className="reUseBtn"
                      onClick={() => this.deleted(item.id)}
                    >
                      Delete
                    </Button>
                  </Form.Group>
                </Form>
              </li>
            ))}
          </ul>
        </div>
        <div className="linkStyle">
          <Link
            id="addTaskLink"
            onClick={this.createTaskList}
            to={{ pathname: "/taskModal", state: { modal: true } }}
          >
            +
          </Link>
        </div>
      </div>
    );
  }
}
// map state to props
const mapStateToProps = state => ({
  userData: state.userData,
  userTasks: state.userTasks
})
const mapDispatchToProps = {
  updateTask,
  getTASKS,
  deleteTask,
 }
// export the Component
export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
