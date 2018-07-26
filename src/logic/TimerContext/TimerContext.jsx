import React from "react";
import * as GeneralState from "src/logic/GeneralState";

const POMODORO_TIME = 25 * 60 * 1000;
export const Context = React.createContext();

class TimerContext extends React.Component {
  time = POMODORO_TIME;

  tick = () => {
    const { isTimerRunning, remainigTime } = this.state;
    if (isTimerRunning) {
      let currentTime = new Date();
      if (remainigTime >= 0) {
        this.setState({
          remainigTime: this.time - (currentTime - this.startTime)
        });
        window.requestAnimationFrame(this.tick);
      } else {
        this.completeCycle();
      }
    }
  };

  completeCycle = () => {
    this.setState(() => ({
      remainigTime: POMODORO_TIME,
      isTimerRunning: false
    }));
    this.props.addCycle();
    GeneralState.logCycle();
  };

  startTimer = () => {
    this.setState(
      () => ({
        isTimerRunning: true
      }),
      () => {
        this.startTime = Date.now();
        window.requestAnimationFrame(this.tick);
      }
    );
  };

  stopTimer = () => {
    this.time = this.state.remainigTime;
    this.setState({
      isTimerRunning: false
    });
  };

  state = {
    remainigTime: POMODORO_TIME,
    startTimer: this.startTimer,
    stopTimer: this.stopTimer,
    isTimerRunning: false
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default TimerContext;
