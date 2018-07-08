import React from "react";

const POMODORO_TIME = 0.025 * 60 * 1000;
export const Context = React.createContext();

class TimerContext extends React.Component {
  time = POMODORO_TIME;

  tick = () => {
    const { isTimerRunning, remainigTime } = this.state;
    if (isTimerRunning) {
      let currentTime = Date.now();
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
    this.setState(
      () => ({
        remainigTime: POMODORO_TIME,
        isTimerRunning: false,
        endOfCycle: true
      }),
      () => {
        this.setState({ endOfCycle: false });
      }
    );
  };

  startTimer = () => {
    this.setState(
      () => ({
        isTimerRunning: true,
        endOfCycle: false
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
    isTimerRunning: false,
    endOfCycle: false
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
