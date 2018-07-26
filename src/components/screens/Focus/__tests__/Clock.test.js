import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Clock from "src/components/screens/Focus/Clock";
import TimerContext from "src/logic/TimerContext/TimerContext";

test("renders correctly", () => {
  const wrapper = renderer
    .create(
      <TimerContext>
        <Clock />
      </TimerContext>
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});

test("stop and start timer", () => {
  const wrapper = mount(
    <TimerContext>
      <Clock />
    </TimerContext>
  );

  wrapper
    .childAt(0)
    .find("button")
    .at(0)
    .simulate("click");

  expect(wrapper.instance().state.isTimerRunning).toEqual(true);
});
