import React from "react";
import moment from "moment";
import { Context } from "../../../logic/TimerContext";
import play_btn from "../../../pics/play_btn.png";
import pause_btn from "../../../pics/pause_btn.png";
import ClockSlider from "./ClockSlider";

const Clock = () => (
  <div className="left_col">
    <Context.Consumer>
      {({
        isTimerRunning,
        stopTimer,
        startTimer,
        remainingTime,
        setRemainingTime,
      }) => (
        <div className="clockContainer">
          <h1 style={{ marginBottom: "0px" }} id="clock">
            {moment(remainingTime).format("mm:ss")}
          </h1>
          <ClockSlider
            setRemainingTime={setRemainingTime}
            remainingTime={remainingTime}
          />
          <div className="buttons">
            <button
              className="no-btn-styles round"
              onClick={isTimerRunning ? stopTimer : startTimer}
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
            </button>
          </div>
        </div>
      )}
    </Context.Consumer>
  </div>
);

export default Clock;
