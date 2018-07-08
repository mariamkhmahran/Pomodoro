import React from "react";
import slider from "src/pics/slider.png";
import checked from "src/pics/checked.svg";
import arrow from "src/pics/Polygon.svg";

export const QueueCard = props => (
  <div className="q_card card">
    <div className="slider">
      <img id="slider_img" src={slider} alt="queue" />
    </div>
    <div className="content q_content">
      <button
        className="check big"
        onClick={() => props.markAsDone(props.task)}
      />
      <p>{props.task.name}</p>
      <span id="cyclesDone">
        {`${props.task.cyclesDone} ${
          props.task.cyclesDone === 1 ? "Cycle" : "Cycles"
        }`}{" "}
      </span>
    </div>
  </div>
);

const SubCard = props => (
  <div className="card subCard content">
    <button
      className="check small"
      // onClick={() => props.markAsDone(props.task)}
    />
    <p>{props.task.name}</p>
    <span id="cyclesDone">
      {`${props.task.cyclesDone} ${
        props.task.cyclesDone === 1 ? "Cycle" : "Cycles"
      }`}{" "}
    </span>
  </div>
);

export class TaskCard extends React.Component {
  expandPanel = () => {
    let panel = document.getElementById("panel");
    if (panel.style.maxHeight) {
      document.getElementById("arrow").style.transform = null;
      panel.style.maxHeight = null;
    } else {
      document.getElementById("arrow").style.transform = "scaleY(-1)";
      panel.style.maxHeight = panel.scrollHeight + 3 + "px";
    }
  };

  render() {
    return (
      <div className="maxWidth centerAlign column">
        <div className="task_card card">
          <div className="content task_content">
            <div>
              {this.props.task.done ? (
                <img className="small" src={checked} alt="checkbox" />
              ) : (
                <button
                  className="check small "
                  onClick={() => this.props.onclick(this.props.task)}
                />
              )}
              <div className="task_data">
                <b id="name">{this.props.task.name}</b>
                <span>- Cycles done: {this.props.task.cyclesDone}</span>
                <span>
                  - Estimated total number of cycles:{" "}
                  {this.props.task.estimatedTime}
                </span>
                <span>- Deadline: {this.props.task.deadline}</span>
              </div>
              <div className="actions">
                {this.props.task.subTasks &&
                this.props.task.subTasks.length > 0 ? (
                  <button
                    className="no-btn-styles expandBtn"
                    onClick={this.expandPanel}
                  >
                    <img src={arrow} alt="expand" id="arrow" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="expansionPanel maxWidth" id="panel">
          {this.props.task.subTasks
            ? this.props.task.subTasks.map(task => (
                <SubCard
                  key={task.id}
                  task={task}
                  onclick={this.props.onclick}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}
