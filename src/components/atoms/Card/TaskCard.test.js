import React from "react";
import { mount } from "enzyme";
import { TaskCard } from "src/components/atoms/Card";
import TasksData from "src/mocks/TasksData.json";

const tasks = TasksData.data;
const onClick = jest.fn();

test("should render correctly", () => {
  const wrapper = mount(<TaskCard task={tasks[0]} />);
  expect(wrapper.props().task.id).toEqual(tasks[0].id);
});
test("done tasks", () => {
  const wrapper = mount(<TaskCard task={tasks[4]} />, {
    attachTo: document.body
  });
  expect(document.getElementById("doneImg")).toBeTruthy();
  expect(wrapper.find("button").length).toEqual(0);
});

test("check button", () => {
  const wrapper = mount(<TaskCard onclick={onClick} task={tasks[0]} />);
  wrapper
    .find("button")
    .at(0)
    .simulate("click");
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("delete button", () => {
  let onDelete = jest.fn();
  const wrapper = mount(
    <TaskCard onclick={onClick} task={tasks[0]} onDelete={onDelete} />
  );
  wrapper
    .find(".card__close")
    .at(0)
    .simulate("click");
  expect(onDelete).toHaveBeenCalledTimes(1);
});

test("subTasks don't exist", () => {
  const wrapper = mount(<TaskCard onclick={onClick} task={tasks[1]} />, {
    attachTo: document.body
  });
  let panel = document.getElementById("panel");

  expect(wrapper.find("button").length).toEqual(1);
  expect(panel.style.maxHeight).toEqual("");
});

test("subTasks exist", () => {
  let task = tasks.splice(0, 1);
  task.subTasks = [
    {
      id: "_kkvvaj596",
      name: "design",
      cyclesDone: 2,
      estimatedTime: 9,
      deadline: "15/6/2020",
      done: false
    },
    {
      id: "_kkvvaa796",
      name: "implement",
      cyclesDone: 1,
      estimatedTime: 11,
      deadline: "1/7/2020",
      done: false
    }
  ];
  const wrapper = mount(<TaskCard onclick={onClick} task={task} />, {
    attachTo: document.body
  });
  let panel = document.getElementById("panel");

  wrapper
    .find("button")
    .at(1)
    .simulate("click");
  expect(panel.style.maxHeight).toBeTruthy();

  wrapper
    .find("button")
    .at(1)
    .simulate("click");
  expect(document.getElementById("arrow").style.transform).toEqual("");
  expect(panel.style.maxHeight).toEqual("");
});
