import React from "react";
import { mount } from "enzyme";
import { QueueCard } from "src/components/atoms/Card";
import TasksData from "src/mocks/TasksData.json";

const tasks = TasksData.data;
const onClick = jest.fn();

test("should render correctly", () => {
  const wrapper = mount(<QueueCard task={tasks[0]} />);
  expect(wrapper.props().task.id).toEqual(tasks[0].id);
});

test("check button", () => {
  const wrapper = mount(<QueueCard markAsDone={onClick} task={tasks[2]} />);
  wrapper
    .find("button")
    .at(0)
    .simulate("click");
  expect(onClick).toHaveBeenCalledTimes(1);
});
