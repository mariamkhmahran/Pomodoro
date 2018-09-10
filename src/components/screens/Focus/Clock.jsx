import React from "react";
import moment from "moment";
import { Context } from "src/logic/TimerContext";
import ClockTicks from "src/components/screens/Focus/ClockSlider/ClockTicks";
import play_btn from "src/pics/play_btn.png";
import pause_btn from "src/pics/pause_btn.png";

const Clock = () => (
  <div className="left_col">
    <Context.Consumer>
      {({
        isTimerRunning,
        stopTimer,
        startTimer,
        remainigTime,
        setRemainingTime
      }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
          <h1 style={{ marginBottom: "0px" }} id="clock">
            {moment(remainigTime).format("mm:ss")}
          </h1>
          <ClockTicks value={remainigTime} onChange={setRemainingTime} />
          <button
            className="no-btn-styles round"
            onClick={() => (isTimerRunning ? stopTimer() : startTimer())}>
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
      )}
    </Context.Consumer>
  </div>
);

export default Clock;
