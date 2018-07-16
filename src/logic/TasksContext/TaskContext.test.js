import React from "react";
import TaskContext from "./TasksContext";
import TasksData from "src/mocks/TasksData";
import { shallow } from "enzyme";

xtest("initialState", () => {
  let wrapper = shallow(<TaskContext />);
  let instance = wrapper.instance();
  expect(instance.state).toMatchObject({
    tasks: [],
    queue: [],
    done: [],
    addTask: instance.addTask,
    addCycle: instance.addCycle,
    markAsDone: instance.markAsDone
  });
});

xtest("TaskContext.addTask", async () => {
  let wrapper = shallow(<TaskContext />);
  let instance = wrapper.instance();
  await instance.addTask({ name: "new task", cycles: 5, deadline: Date.now() });
  // console.log(storage);
  // expect(storage["tasks"][0]).toHaveProperty("name", "new task");
  // expect(storage["queue"][0]).toHaveProperty("name", "new task");
  // expect(instance.state.tasks[0]).toHaveProperty("name", "new task");
  expect(instance.state.tasks[0]).toHaveProperty("name", "new task");
});

xtest("TaskContext.addCycle", () => {
  let wrapper = shallow(<TaskContext />);
  let instance = wrapper.instance();
  instance.setState({ queue: TasksData.data });
  expect(instance.state).toHaveProperty("queue", TasksData.data);
  let initialCycles = instance.state.queue[0].cyclesDone;
  expect(initialCycles).toEqual(5);
  instance.addCycle();
  expect(instance.state.queue[0].cyclesDone).toEqual(6);
});
