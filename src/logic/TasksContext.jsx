import React from "react";
import * as GeneralState from "src/logic/GeneralState";

export const ContextTasks = React.createContext();

class TimerContext extends React.Component {
  state = {
    tasks: [],
    queue: [],
    done: [],
    addTask: this.addTask,
    addCycle: this.addCycle,
    markAsDone: this.markAsDone
  };
  componentDidMount() {
    this.update();
  }
  update = async () => {
    let state = await GeneralState.getAll();
    this.setState(
      () => ({
        ...state,
        addTask: this.addTask,
        addCycle: this.addCycle,
        markAsDone: this.markAsDone
      }),
      () => {
        console.log(this.state);
      }
    );
  };

  addTask = async ({ name, cycles, deadline }) => {
    let id = "_" + Math.random().toString(36);
    let task = {
      id: id.substr(2, 9),
      name: name,
      cyclesDone: 0,
      estimatedTime: cycles,
      deadline: deadline,
      subTasks: [],
      done: false
    };
    let queue = GeneralState.get("queue");

    let promise = GeneralState.set("tasks", [task, ...this.state.tasks]);
    GeneralState.set("queue", [...queue, task]);

    Promise.all([promise]).then(() => {
      this.update();
      var modal = document.getElementById("modal");
      modal.style.display = "none";
    });
  };

  addCycle = async task => {
    task.cyclesDone += 1;

    let Promises = [
      GeneralState.updateItem("task", task, t => t.id === task.id),
      GeneralState.updateItem("queue", task, t => t.id === task.id)
    ];

    Promise.all(Promises).then(() => {
      this.update();
    });
  };

  markAsDone = async task => {
    task.done = true;
    task.subTasks.forEach(task => {
      task.done = true;
    });

    let Promises = [
      GeneralState.removeItem("tasks", t => t.id === task.id),
      GeneralState.removeItem("queue", t => t.id === task.id),
      GeneralState.addAtBeginning("done", task)
    ];

    Promise.all(Promises).then(() => {
      this.update();
    });
  };

  render() {
    return (
      <ContextTasks.Provider value={this.state}>
        {this.props.children}
      </ContextTasks.Provider>
    );
  }
}
export default TimerContext;
