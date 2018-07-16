import React from "react";
import { mount } from "enzyme";
import Clock from "src/components/screens/Focus/Clock";
import context from "src/logic/TimerContext/testHelpers";
import TimerContext from "src/logic/TimerContext/TimerContext";

xtest("renders correctly", () => {
  console.log(context);
  jest.doMock("src/logic/TimerContext/TimerContext", () => {
    return {
      Context: {
        TimerContext,
        Consumer: props => props.children(context)
      }
    };
  });
  const wrapper = mount(<Clock />);

  expect(wrapper.props().isTimerRunning).to.equal(false);
});
