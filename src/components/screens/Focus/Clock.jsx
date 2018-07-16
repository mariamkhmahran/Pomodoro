import React from "react";
import moment from "moment";
import { Context } from "src/logic/TimerContext";
import play_btn from "src/pics/play_btn.png";
import pause_btn from "src/pics/pause_btn.png";

const Clock = () => (
  <div className="left_col">
    <Context.Consumer>
      {({ isTimerRunning, stopTimer, startTimer, remainigTime }) => (
        <div>
          <h1 id="clock">{moment(remainigTime).format("mm:ss")}</h1>
          <button
            className="no-btn-styles round"
            onClick={() => (isTimerRunning ? stopTimer() : startTimer())}>
            {isTimerRunning ? (
              <img className="circular_btn" src={pause_btn} alt="pause" />
            ) : (
              <img className="circular_btn" id="play" src={play_btn} alt="start" />
            )}
          </button>
        </div>
      )}
    </Context.Consumer>
  </div>
);

export default Clock;
