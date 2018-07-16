import React from "react";
import * as GeneralState from "src/logic/GeneralState";

export const ContextTasks = React.createContext();

class TasksContext extends React.Component {
  componentDidMount() {
    this.update();
  }

  update = async () => {
    let state = await GeneralState.getAll();
    this.setState(() => ({
      ...state
    }));
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

    let promise = GeneralState.set("tasks", [task, ...this.state.tasks]);
    GeneralState.set("queue", [...this.state.queue, task]);

    Promise.all([promise]).then(() => {
      this.update();
      var modal = document.getElementById("modal");
      modal.style.display = "none";
    });
  };

  addCycle = async () => {
    let task = this.state.queue.slice(0, 1)[0];

    task.cyclesDone += 1;
    let Promises = [
      GeneralState.updateItem("tasks", task, t => t.id === task.id),
      GeneralState.updateItem("queue", task, t => t.id === task.id)
    ];

    await Promise.all(Promises);
    this.update();
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

    await Promise.all(Promises);
    this.update();
  };

  reOrder = async (...args) => {
    this.setState({ queue: await GeneralState.reOrder(...args) });
  };

  state = {
    tasks: [],
    queue: [],
    done: [],
    addTask: this.addTask,
    addCycle: this.addCycle,
    markAsDone: this.markAsDone,
    reOrder: this.reOrder
  };

  render() {
    return (
      <ContextTasks.Provider value={this.state}>
        {this.props.children}
      </ContextTasks.Provider>
    );
  }
}
export default TasksContext;
