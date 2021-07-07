import React from "react";
import * as GeneralState from "../GeneralState";

export const ContextTasks = React.createContext();

class TasksContext extends React.Component {
  async componentDidMount() {
    await this.update();
    this.props.onDidMount && this.props.onDidMount(this);
  }

  update = async () => {
    let state = await GeneralState.getAll();
    this.setState(() => ({
      ...state,
    }));
  };

  addTask = async ({ name, cycles, deadline }) => {
    let id = "_" + Math.random().toString(36);
    let task = {
      id: id.substr(2, 9),
      name,
      cyclesDone: 0,
      estimatedTime: cycles,
      deadline,
      subTasks: [],
      done: false,
    };

    await Promise.all([
      GeneralState.addAtBeginning("tasks", task),
      GeneralState.addAtEnd("queue", task),
    ]);

    await this.update();
  };

  addCycle = async () => {
    let task = this.state.queue.slice(0, 1)[0];

    !!task && (task.cyclesDone += 1);
    let Promises = [
      GeneralState.updateItem("tasks", task, (t) => t.id === task.id),
      GeneralState.updateItem("queue", task, (t) => t.id === task.id),
    ];

    await Promise.all(Promises);
    await this.update();
  };

  markAsDone = async (task) => {
    task.done = true;
    task.subTasks &&
      task.subTasks.forEach((task) => {
        task.done = true;
      });

    let Promises = [
      GeneralState.removeItem("tasks", (t) => t.id === task.id),
      GeneralState.removeItem("queue", (t) => t.id === task.id),
      GeneralState.addAtBeginning("done", task),
      GeneralState.logTask(),
    ];

    await Promise.all(Promises);
    await this.update();
  };

  deleteTask = async (task) => {
    let Promises = [
      await GeneralState.removeItem("tasks", (t) => t.id === task.id),
      await GeneralState.removeItem("done", (t) => t.id === task.id),
      await GeneralState.removeItem("queue", (t) => t.id === task.id),
    ];
    await Promise.all(Promises);
    await this.update();
  };

  reOrder = async (...args) => {
    this.setState({ queue: await GeneralState.reOrder(...args) });
    await GeneralState.set("queue", this.state.queue);
  };

  state = {
    tasks: [],
    queue: [],
    done: [],
    addTask: this.addTask,
    addCycle: this.addCycle,
    markAsDone: this.markAsDone,
    deleteTask: this.deleteTask,
    reOrder: this.reOrder,
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
