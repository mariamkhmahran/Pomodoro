import React from "react";
import localforage from "localforage";
import tasks from "src/mocks/TasksData.json";
import Header from "src/components/layout/Header";
import { TaskCard } from "src/components/atoms/Card";

export default class Tasks extends React.Component {
  state = {
    tasks: [],
    done: []
  };

  componentDidMount() {
    let tempTasks = [],
      tempDone = [];
    tasks.data.map(task => {
      task.done ? tempDone.push(task) : tempTasks.push(task);
    });
    this.setState(
      () => ({
        tasks: tempTasks,
        done: tempDone
      }),
      () => {
        localforage.setItem("tasks", this.state.tasks, () => {
          localforage.setItem("done", this.state.done);
        });
      }
    );
  }

  // componentDidMount() {
  //   this.updateState();
  // }

  updateState = () => {
    localforage.getItem("tasks", (err, tasks) => {
      this.setState(
        () => ({ tasks: tasks }),
        () => {
          localforage.getItem("done", (err, done) => {
            this.setState(() => ({ done: done }));
          });
        }
      );
    });
  };

  renderCard(task) {
    return <TaskCard task={task} onclick={this.markAsDone} />;
  }

  addTask = () => {
    let task = {
      id:
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9),
      name: document.getElementById("name").value,
      cyclesDone: 0,
      estimatedTime: document.getElementById("cycles").value,
      deadline: document.getElementById("deadline").value,
      subTasks: [],
      done: false
    };

    let self = this;

    localforage.getItem("tasks", (err, tasks) => {
      debugger;
      localforage.setItem("tasks", [task, ...tasks], () => {
        self.updateState();
        self.clearFields();
        var modal = document.getElementById("modal");
        modal.style.display = "none";
      });
    });
  };

  clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("cycles").value = "";
    document.getElementById("deadline").value = null;
  }

  markAsDone = task => {
    let index = this.state.tasks.indexOf(task);
    if (index > -1) {
      let tempTask = this.state.tasks;
      tempTask.splice(index, 1);
      task.done = true;
      task.subTasks.forEach(task => {
        task.done = true;
      });
      this.setState(
        ({ tasks, done }) => ({
          tasks: tempTask,
          done: [task, ...done]
        }),
        () => {
          localforage.setItem("tasks", this.state.tasks, () => {
            localforage.setItem("done", this.state.done);
          });
        }
      );
    }
  };

  Modal = () => (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <span className="subtitle orange">ADD NEW TASK</span>
        <input
          className="inputField"
          type="text"
          id="name"
          placeholder="Name"
        />
        <input
          className="inputField"
          type="text"
          id="cycles"
          placeholder="Estimated total number of cycles"
        />
        <input
          className="inputField"
          type="date"
          id="deadline"
          placeholder="Deadline"
        />
        <div>
          <button className="btn addTask" onClick={this.addTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );

  showModal = () => {
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
    let self = this;
    span.onclick = function() {
      modal.style.display = "none";
      self.clearFields();
    };

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  render() {
    return (
      <div className="router_output">
        <Header />
        <this.Modal />
        <div className="subHeader">
          <span className="subtitle">TASKS</span>
          <button className="btn plusBtn" onClick={this.showModal}>
            <i className="fa fa-plus" />
          </button>
        </div>
        <div className="tasks">
          <div>
            <div className="col">
              <div className="transparent_box">
                <span className="subtitle">TO DO</span>
                <div className="cardList">
                  {this.state.tasks.map(task => this.renderCard(task))}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="transparent_box">
                <span className="subtitle">DONE</span>
                <div className="cardList">
                  {this.state.done.map(task => this.renderCard(task))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
