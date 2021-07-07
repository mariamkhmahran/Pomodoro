import React from "react";
import Modal from "./Modal";
import { TaskCard } from "../../atoms/Card";
import { ContextTasks } from "../../../logic/TasksContext";
import "./Tasks.css";

export default class Tasks extends React.Component {
  state = {
    addTaskModalIsOpen: false
  };

  render() {
    const { addTaskModalIsOpen } = this.state;
    return (
      <ContextTasks.Consumer>
        {({ tasks, done, addTask, addCycle, markAsDone, deleteTask }) => {
          return (
            <div className="router_output">
              <Modal
                addTask={addTask}
                isOpen={addTaskModalIsOpen}
                onClose={() => this.setState({ addTaskModalIsOpen: false })}
              />
              <div className="subHeader">
                <span className="subtitle">TASKS</span>
                <button
                  className="btn plusBtn"
                  onClick={() => this.setState({ addTaskModalIsOpen: true })}>
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
                          <TaskCard
                            key={task.id}
                            task={task}
                            onclick={markAsDone}
                            onDelete={deleteTask}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="transparent_box">
                      <span className="subtitle">DONE</span>
                      <div className="cardList">
                        {done.map(task => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            onclick={markAsDone}
                            onDelete={deleteTask}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ContextTasks.Consumer>
    );
  }
}
