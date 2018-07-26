import React from "react";
import renderer from "react-test-renderer";
import Focus from "src/components/screens/Focus";
import TimerContext from "src/logic/TimerContext";
import TasksContext from "src/logic/TasksContext";

xtest("renders correctly", () => {
  const wrapper = renderer
    .create(
      <TasksContext>
        <TimerContext>
          <Focus />
        </TimerContext>
      </TasksContext>
    )
    .toJSON();

  expect(wrapper).toMatchSnapshot();
});
