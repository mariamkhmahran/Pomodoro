import React from "react";
import TasksContext from "./TasksContext";
import TasksData from "src/mocks/TasksData";
import ChartData from "src/mocks/ChartData.json";
import { shallow } from "enzyme";
import * as GeneralState from "src/logic/GeneralState";

test("initialState", () => {
  let wrapper = shallow(<TasksContext />);
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

test("TasksContext.addTask", async () => {
  let wrapper = shallow(<TasksContext />);
  let instance = wrapper.instance();
  await instance.addTask({ name: "new task", cycles: 5, deadline: Date.now() });
  let tasks = await GeneralState.get("tasks");
  let queue = await GeneralState.get("queue");

  expect(tasks[0]).toHaveProperty("name", "new task");
  expect(queue[0]).toHaveProperty("name", "new task");

  expect(instance.state.tasks[0]).toHaveProperty("name", "new task");
});

test("TasksContext.addCycle", async () => {
  await GeneralState.set("queue", TasksData.data);
  await GeneralState.set("tasks", TasksData.data);
  let instance = await new Promise((resolve, reject) => {
    shallow(<TasksContext onDidMount={inst => resolve(inst)} />);
  });
  expect(instance.state).toHaveProperty("queue", TasksData.data);

  let initialCycles = instance.state.queue[0].cyclesDone;
  expect(initialCycles).toEqual(5);

  await instance.addCycle();
  expect(instance.state.queue[0].cyclesDone).toEqual(6);
});

test("TasksContext.markAsDone", async () => {
  TasksData.data[0].subTasks = [
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
  await GeneralState.set("chartData", ChartData);
  await GeneralState.set("queue", TasksData.data);
  await GeneralState.set("tasks", TasksData.data);
  let task = TasksData.data.slice(0, 1)[0];
  let instance = await new Promise((resolve, reject) => {
    shallow(<TasksContext onDidMount={inst => resolve(inst)} />);
  });

  await instance.markAsDone(task);

  expect(instance.state.done.length).toEqual(1);
  expect(instance.state.tasks.length).toBeLessThan(TasksData.data.length);
  expect(instance.state.queue.length).toBeLessThan(TasksData.data.length);
});

test("TasksContext.deleteTask", async () => {
  await GeneralState.set("queue", TasksData.data);
  await GeneralState.set("tasks", TasksData.data);
  let task = TasksData.data.slice(0, 1)[0];
  let instance = await new Promise((resolve, reject) => {
    shallow(<TasksContext onDidMount={inst => resolve(inst)} />);
  });

  await instance.deleteTask(task);

  expect(instance.state.tasks.length).toBeLessThan(TasksData.data.length);
  expect(instance.state.queue.length).toBeLessThan(TasksData.data.length);
});

test("TasksContext.reOrder", async () => {
  await GeneralState.set("queue", TasksData.data);
  let queue = await GeneralState.get("queue");
  let instance = await new Promise((resolve, reject) => {
    shallow(<TasksContext onDidMount={inst => resolve(inst)} />);
  });

  await instance.reOrder(queue, 0, 3);

  expect(instance.state.queue[0].id).toEqual(queue[1].id);
  expect(instance.state.queue[3].id).toEqual(queue[0].id);
  expect(instance.state.queue.length).toEqual(queue.length);
});
