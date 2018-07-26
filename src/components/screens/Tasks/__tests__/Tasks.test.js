import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import Tasks from "src/components/screens/Tasks";
import TasksContext from "src/logic/TasksContext/TasksContext.jsx";
import * as GeneralState from "src/logic/GeneralState";
import TasksData from "src/mocks/TasksData";

test("render", async () => {
  let wrapper;
  await GeneralState.set("tasks", [TasksData.data[0], TasksData.data[1]]);
  await GeneralState.set("done", [TasksData.data[4]]);
  await new Promise((resolve, reject) => {
    wrapper = renderer.create(
      <TasksContext onDidMount={inst => resolve(inst)}>
        <Tasks />
      </TasksContext>
    );
  });
  wrapper = wrapper.toJSON();
  expect(wrapper).toMatchSnapshot();
});

test("open modal", () => {
  const wrapper = mount(
    <TasksContext>
      <Tasks />
    </TasksContext>,
    {
      attachTo: document.body
    }
  );
  let isOpen = wrapper
    .find("div")
    .at(1)
    .getDOMNode()
    .getAttribute("data-is-open");
  expect(isOpen).toEqual("false");

  wrapper
    .childAt(0)
    .find("button")
    .at(1)
    .simulate("click");

  isOpen = wrapper
    .find("div")
    .at(1)
    .getDOMNode()
    .getAttribute("data-is-open");
  expect(wrapper.childAt(0).instance().state).toHaveProperty(
    "addTaskModalIsOpen",
    true
  );
  expect(isOpen).toEqual("true");
});

test("close modal", () => {
  const wrapper = mount(
    <TasksContext>
      <Tasks />
    </TasksContext>
  );
  let instance = wrapper.childAt(0).instance();
  instance.setState({ addTaskModalIsOpen: true });

  wrapper
    .find(".modal__close")
    .at(0)
    .simulate("click");
  expect(instance.state.addTaskModalIsOpen).toEqual(false);
});
