import React from "react";
import slider from "src/pics/slider.png";
import checked from "src/pics/checked.svg";
import arrow from "src/pics/Polygon.svg";

export const QueueCard = props => {
  let { task, markAsDone } = props;
  let { name, cyclesDone } = task;
  return (
    <div className="q_card card">
      <div {...props.dragHandle} className="slider">
        <img id="slider_img" src={slider} alt="queue" />
      </div>
      <div className="content q_content">
        <button className="check big" onClick={() => markAsDone(task)} />
        <p>{name}</p>
        <span id="cyclesDone">{`${cyclesDone} ${
          cyclesDone === 1 ? "Cycle" : "Cycles"
        }`}</span>
      </div>
    </div>
  );
};

const SubCard = props => (
  <div className="card subCard content">
    <button className="check small" />
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
    let { task, onclick } = this.props;
    let { name, deadline, cyclesDone, estimatedTime, done, subTasks } = task;

    return (
      <div className="maxWidth centerAlign column">
        <div className="task_card card">
          <div className="content task_content">
            <div>
              {done ? (
                <img
                  id="doneImg"
                  className="small"
                  src={checked}
                  alt="checkbox"
                />
              ) : (
                <button
                  className="check small "
                  onClick={() => onclick(task)}
                />
              )}
              <div className="task_data">
                <b id="name">{name}</b>
                <span>- Cycles done: {cyclesDone}</span>
                <span>- Estimated total number of cycles: {estimatedTime}</span>
                <span>- Deadline: {deadline}</span>
              </div>
              <div className="actions">
                {subTasks && subTasks.length > 0 ? (
                  <button
                    className="no-btn-styles expandBtn"
                    onClick={this.expandPanel}>
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
          {subTasks.length > 0
            ? subTasks.map(task => (
                <SubCard key={task.id} task={task} onclick={onclick} />
              ))
            : ""}
        </div>
      </div>
    );
  }
}
