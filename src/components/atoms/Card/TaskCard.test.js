import React from "react";
import { mount } from "enzyme";
import { TaskCard } from "src/components/atoms/Card";
import TasksData from "src/mocks/TasksData.json";

const tasks = TasksData.data;
const onClick = jest.fn();

describe("Task card", () => {
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

  test("subTasks don't exist", () => {
    const wrapper = mount(<TaskCard onclick={onClick} task={tasks[1]} />, {
      attachTo: document.body
    });
    let panel = document.getElementById("panel");

    expect(wrapper.find("button").length).toEqual(1);
    expect(panel.style.maxHeight).toEqual("");
  });

  test("subTasks exist", () => {
    const wrapper = mount(<TaskCard onclick={onClick} task={tasks[0]} />, {
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
});
