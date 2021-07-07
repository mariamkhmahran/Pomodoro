import React, { useEffect, useState } from "react";
import * as GeneralState from "../GeneralState";

const POMODORO_TIME = 25 * 60 * 1000;
export const Context = React.createContext();

const TimerContext = (props) => {
  const [remainingTime, setremainingTime] = useState(POMODORO_TIME);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState();
  const [time, setTime] = useState(POMODORO_TIME);
  const isTimerRunning_ref = React.useRef(isTimerRunning);

  useEffect(() => {
    if (!!isTimerRunning) setStartTime(Date.now());
    isTimerRunning_ref.current = isTimerRunning;
  }, [isTimerRunning]);

  useEffect(() => {
    if (!!startTime && !!isTimerRunning) window.requestAnimationFrame(tick);
  }, [startTime]);

  useEffect(() => {
    setTime(remainingTime);
  }, [remainingTime]);

  const tick = () => {
    if (!!isTimerRunning_ref.current) {
      let currentTime = new Date();
      if (remainingTime >= 0) {
        setremainingTime(time - (currentTime - startTime));
        window.requestAnimationFrame(tick);
      } else {
        completeCycle();
      }
    }
  };

  const completeCycle = () => {
    setIsTimerRunning(false);
    setremainingTime(POMODORO_TIME);
    props.addCycle();
    GeneralState.logCycle();
  };

  const startTimer = () => setIsTimerRunning(true);

  const stopTimer = () => {
    setTime(remainingTime);
    setIsTimerRunning(false);
  };

  const setRemainingTime = (value) =>
    setremainingTime((t) => (t + value) % (60 * 60 * 1000));

  return (
    <Context.Provider
      value={{
        remainingTime,
        startTimer,
        stopTimer,
        isTimerRunning,
        setRemainingTime,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default TimerContext;
