import * as GeneralState from "./GeneralState";
import TasksData from "src/mocks/TasksData.json";
import { storage } from "localforage";
import ChartData from "src/mocks/ChartData.json";

test("GeneralState.set", async () => {
  await GeneralState.set("happy", true);
  expect(storage).toHaveProperty("happy", true);
});

test("GeneralState.get", async () => {
  await GeneralState.set("happy", true);
  let result = await GeneralState.get("happy");
  expect(result).toEqual(true);
  result = await GeneralState.get("sad");
  expect(result).toEqual([]);
});

test("GeneralState.getIndex", async () => {
  await GeneralState.set("test", [0, 1, 3, 4, 5]);
  let i = await GeneralState.getIndex("test", number => number === 1);
  expect(i).toEqual(1);
  let i1 = await GeneralState.getIndex("test", number => number === 6);
  expect(i1).toEqual(-1);
});

test("GeneralState.getAll", async () => {
  let fun = jest.fn();
  let data = [TasksData.data[0], TasksData.data[1]];
  await GeneralState.set("tasks", data[0]);
  await GeneralState.set("queue", data[0]);
  await GeneralState.set("done", data[1]);
  let result = await GeneralState.getAll();
  expect(result.tasks).toMatchObject(data[0]);
  expect(result.queue).toMatchObject(data[0]);
  expect(result.done).toMatchObject(data[1]);
  await GeneralState.getAll(fun);
  expect(fun).toHaveBeenCalled();
});

test("GeneralState.removeItem", async () => {
  await GeneralState.set("test", [1, 3, 4, 5]);
  await GeneralState.removeItem("test", number => number === 1);
  await GeneralState.removeItem("test", number => number === 6);
  expect(storage).toHaveProperty("test", [3, 4, 5]);
});

test("GeneralState.addAtBeginning", async () => {
  await GeneralState.set("test", [3, 4, 5]);
  await GeneralState.addAtBeginning("test", 1);
  expect(storage).toHaveProperty("test", [1, 3, 4, 5]);
});

test("GeneralState.addAtEnd", async () => {
  await GeneralState.set("test", [1, 3, 4]);
  await GeneralState.addAtEnd("test", 5);
  expect(storage).toHaveProperty("test", [1, 3, 4, 5]);
});

test("GeneralState.updateItem", async () => {
  await GeneralState.set("test", [
    { name: "anna", age: 56 },
    { name: "alice", age: 6 }
  ]);
  await GeneralState.updateItem(
    "test",
    { name: "anna", age: 60 },
    test => test.name === "anna"
  );
  await GeneralState.updateItem(
    "test",
    { name: "david", age: 100 },
    test => test.name === "david"
  );
  expect(storage["test"][0]).toHaveProperty("name", "anna");
  expect(storage["test"][0]).toHaveProperty("age", 60);
  expect(storage["test"][1]).toHaveProperty("name", "alice");
  expect(storage["test"].length).toEqual(2);
});

test("GeneralState.reOrder", async () => {
  let queue = await GeneralState.reOrder([1, 5, 2, 3, 4], 1, 4);
  let none = await GeneralState.reOrder([1, 5, 2, 3, 4], -1, 4);
  let none1 = await GeneralState.reOrder([1, 5, 2, 3, 4], 0, 5);
  expect(queue).toEqual([1, 2, 3, 4, 5]);
  expect(none).toEqual(null);
  expect(none1).toEqual(null);
});

test("GeneralState.log", async () => {
  storage["chartData"] = null;
  let data = await GeneralState.log();
  let day = new Date().getDay();

  expect(data.tasks.length).toEqual(8);
  expect(data.tasks[7]).toHaveProperty("value", 0);
  expect(data.tasks[2]).toHaveProperty("value", 0);
  expect(data.tasks[0]).toHaveProperty("value", 0);
  expect(data.tasks[7]).toHaveProperty("day", day);

  data = await GeneralState.log(2);
  expect(data.tasks.length).toEqual(8);
  expect(data.tasks[7]).toHaveProperty("value", 0);
  expect(data.tasks[2]).toHaveProperty("value", 0);
});

describe("chart data", () => {
  beforeEach(async () => {
    await GeneralState.set("chartData", []);
    await GeneralState.set("chartData", ChartData);
  });

  test("GeneralState.logTask", async () => {
    let data = await GeneralState.logTask();
    let day = new Date().getDay();

    expect(data.tasks.length).toEqual(8);
    expect(data.tasks[7]).toHaveProperty("value", 1);
    expect(data.tasks[7]).toHaveProperty("day", day);
  });

  test("GeneralState.logCycle", async () => {
    let data = await GeneralState.logCycle();
    let day = new Date().getDay();

    expect(data.cycles.length).toEqual(8);
    expect(data.cycles[7]).toHaveProperty("value", 1);
    expect(data.cycles[7]).toHaveProperty("day", day);
  });

  test("GeneralState.getChartData", async () => {
    let data = await GeneralState.getChartData();
    let day = new Date().getDay();

    expect(data.cycles.length).toEqual(8);
    expect(data.tasks.length).toEqual(8);
    expect(data.cycles[7]).toHaveProperty("value", 0);
    expect(data.tasks[7]).toHaveProperty("day", day);
  });
});
