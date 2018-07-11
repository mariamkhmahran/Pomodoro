import React from "react";
import Modal from "./Modal";
import { TaskCard } from "src/components/atoms/Card";
import { ContextTasks } from "src/logic/TasksContext";

export default class Tasks extends React.Component {
  state = { ModalOpen: false };
  render() {
    return (
      <ContextTasks.Consumer>
        {({ tasks, done, addTask, addCycle, markAsDone }) => (
          <div className="router_output">
            <Modal addTask={addTask} open={this.state.ModalOpen} />
            <div className="subHeader">
              <span className="subtitle">TASKS</span>
              <button
                className="btn plusBtn"
                onClick={() =>
                  this.setState({ ModalOpen: true }, () =>
                    this.setState({ ModalOpen: false })
                  )
                }>
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="Main tasks">
              <div>
                <div className="col">
                  <div className="transparent_box">
                    <span className="subtitle">TO DO</span>
                    <div className="cardList">
                      {tasks.map(task => (
                        <TaskCard key={task.id} task={task} onclick={markAsDone} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="transparent_box">
                    <span className="subtitle">DONE</span>
                    <div className="cardList">
                      {done.map(task => (
                        <TaskCard key={task.id} task={task} onclick={markAsDone} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContextTasks.Consumer>
    );
  }
}
