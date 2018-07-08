import React from "react";
import { DragSource } from "react-dnd";
import localforage from "localforage";
import Clock from "./Clock";
import { QueueCard } from "src/components/atoms/Card";
import { Context } from "src/logic/TimerContext";
import Header from "src/components/layout/Header";
import play_btn from "src/pics/play_btn.png";
import pause_btn from "src/pics/pause_btn.png";

export default class Focus extends React.Component {
  state = { queue: [] };

  componentDidMount() {
    localforage.getItem("tasks", (err, tasks) =>
      this.setState(() => ({ queue: tasks ? tasks : [] }))
    );
  }

  markAsDone = task => {
    task.done = true;
    task.subTasks.forEach(task => {
      task.done = true;
    });
    localforage.getItem("tasks", (err, tasks) => {
      let index = tasks
        .map(task => {
          return task.id;
        })
        .indexOf(task.id);
      if (index >= 0) {
        tasks.splice(index, 1);
        localforage.setItem("tasks", tasks, () => {
          localforage.getItem("done", (err, done) => {
            localforage.setItem("done", [task, ...done], () => {
              index = this.state.queue
                .map(task => {
                  return task.id;
                })
                .indexOf(task.id);
              if (index >= 0) {
                let tempQueue = this.state.queue;
                tempQueue.splice(index, 1);
                this.setState(() => ({ queue: tempQueue }));
              }
            });
          });
        });
      }
    });
  };

  addCycle = () => {
    localforage.getItem("tasks", (err, tasks) => {
      let index = tasks
        .map(task => {
          return task.id;
        })
        .indexOf(this.state.queue[0].id);
      tasks[index].cyclesDone += 1;
      localforage.setItem("tasks", tasks, () => {
        let tempQueue = this.state.queue;
        tempQueue[0].cyclesDone += 1;
        this.setState(() => ({
          queue: tempQueue
        }));
      });
    });
  };

  render() {
    return (
      <div className="router_output">
        <Header />
        <div className="Main">
          <div className="left_col">
            <Clock />
            <Context.Consumer>
              {({ isTimerRunning, stopTimer, startTimer, endOfCycle }) => (
                <button
                  className="no-btn-styles round"
                  onClick={() => (isTimerRunning ? stopTimer() : startTimer())}
                >
                  {isTimerRunning ? (
                    <img className="circular_btn" src={pause_btn} alt="pause" />
                  ) : (
                    <img
                      className="circular_btn"
                      id="play"
                      src={play_btn}
                      alt="start"
                    />
                  )}
                  {endOfCycle && this.state.queue[0] ? this.addCycle() : ""}
                </button>
              )}
            </Context.Consumer>
            <div className="arc" />
          </div>
          <div className="right_col">
            <h1 className="subtitle">CURRENT QUEUE</h1>
            <div className="qList">
              {this.state.queue.map(task => (
                <QueueCard task={task} markAsDone={this.markAsDone} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
