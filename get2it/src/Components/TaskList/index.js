import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { updateTask } from "../../actions";
import { getTASKS, deleteTask } from "../../actions";
import $ from "jquery";
import { element } from "prop-types";
// build task component and set up state
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // add tasklist to state
    this.state = {
      taskList: [],
      updatedList: [],
      retrievedTasks: [],
      toggleCheck: ""
    };
  }
  event;

  // build function to add tasks to state
  createTaskList = event => {
    // event.preventDefault();
    // pull tasks from props
    const arrList = this.props.userTasks.filter(task => task.status === false);
    const list = [];
    var listItem;
    var spacer = "      ";
    // loop through each task and post them to state
    for (let i = 0; i < arrList.length; i++) {
      list.push(arrList[i]);
    }
    this.setState({
      taskList: list
    });
  };
  itemArr = [];
  check = item => {

    var task = item.id;
    // console.log(task)
    switch (this.itemArr.includes(task)) {
      case false:
        this.itemArr.push(task);
        // console.log(this.itemArr)
        break;
      case true:
        var filtered = this.itemArr.filter(function(el) {
          return el != task;
        });
        this.itemArr = filtered;
      // console.log(filtered)
    }

    // console.log(this.itemArr)
  };

  // var task = item;
  // console.log(key)
  // this.state.taskList[key].toggleClass("checkBoxChecked");
  // console.log(task)
  arrar = [];
  complete = () => {
    for (var i = 0; i < this.itemArr.length; i++) {
      this.arrar.push(this.itemArr[i]);
    }

    this.setState(
      {
        updatedList: this.arrar
      },
      () => {
        console.log(this.arrar);
        this.state.updatedList.map(task => {
          const id = task
          this.getTaskById(id)
        })

        this.setState({
          taskList: this.props.userTasks
        });
      }
    );

  };

  getTaskById = id => {
    let tasksById = []
    this.state.taskList.map(task => {
      if (task.id === id) {
        tasksById.push(task)
      }
    })
    this.setState({
      retrievedTasks: tasksById
      },
      () => {
        console.log(this.state.retrievedTasks);

        this.state.retrievedTasks.map(task => {
          const id = task.id;
          const payload = {
            ...task,
            status: true
          };
          console.log(payload);

          this.props.updateTask(payload, id);
        });
      }
    )
  }

  deleted = id => {
    this.props.deleteTask(id);
    this.setState({
      taskList: this.props.getTASKS(this.props.userData.id)
    });
  };

  componentDidMount() {
    this.createTaskList();
  }
  // render content to page
  render() {
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
                    <div
                      className={`check checkBox ${this.state.toggleCheck}`}
                      onClick={index => this.check(item)}
                      type="checkbox"
                    ></div>
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
          <div className="completeCont">
            <div className="completeBtn">
              <Button onClick={() => this.complete()}>Complete</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = state => ({
  userData: state.userData,
  userTasks: state.userTasks
});
const mapDispatchToProps = {
  updateTask,
  getTASKS,
  deleteTask
};
// export the Component
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
