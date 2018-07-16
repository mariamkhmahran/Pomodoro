import React from "react";
import { shallow } from "enzyme";
import TimerContext from "./TimerContext";

const POMODORO_TIME = 25 * 60 * 1000;

test("compelteCycle ", () => {
  let addCycle = jest.fn();
  let wrapper = shallow(<TimerContext addCycle={addCycle} />);
  let instance = wrapper.instance();
  instance.completeCycle();
  expect(addCycle).toHaveBeenCalled();
  expect(instance.state).toHaveProperty("remainigTime", POMODORO_TIME);
  expect(instance.state).toHaveProperty("isTimerRunning", false);
});

test("startTimer", () => {
  let wrapper = shallow(<TimerContext />);
  let instance = wrapper.instance();
  instance.startTimer();
  expect(instance.state).toHaveProperty("isTimerRunning", true);
  expect(Date(instance.startTime)).toEqual(Date(Date.now()));
});

test("stopTimer", () => {
  let wrapper = shallow(<TimerContext />);
  let instance = wrapper.instance();
  instance.stopTimer();
  expect(instance.state).toHaveProperty("isTimerRunning", false);
  expect(instance.time).toEqual(POMODORO_TIME);
});

xtest("tick", async () => {
  let addCycle = jest.fn();
  let wrapper = shallow(<TimerContext addCycle={addCycle} />);
  let instance = wrapper.instance();
  instance.startTime = Date.now();
  instance.tick();
  expect(instance.state).toHaveProperty("remainigTime", POMODORO_TIME);
  instance.state.remainigTime = 0;
  console.log(instance.state);
  instance.tick();
  expect(addCycle).toHaveBeenCalled();
});
