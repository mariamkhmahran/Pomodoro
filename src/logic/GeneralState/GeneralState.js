import localforage from "localforage";
import chartData from "src/mocks/ChartData.json";

async function set(attr, value, callback) {
  await localforage.setItem(attr, value, callback);
  return value;
}

async function get(attr, callback) {
  return (await localforage.getItem(attr, callback))
    ? localforage.getItem(attr, callback)
    : [];
}

async function getIndex(attr, func) {
  let array = await get(attr);
  let index = array.findIndex(func);
  return index;
}

async function getAll(callback) {
  let tasks = await get("tasks");
  let done = await get("done");
  let queue = await get("queue");

  if (callback) {
    Promise.all([tasks, done, queue]).then(callback({ tasks, queue, done }));
  }
  return { tasks, done, queue };
}

async function removeItem(attr, func) {
  let array = await get(attr);
  let index = await getIndex(attr, func);
  if (~index) {
    array.splice(index, 1);
    await set(attr, array);
    return array;
  }
}

async function addAtBeginning(attr, item) {
  let array = await get(attr);
  await localforage.setItem(attr, array ? [item, ...array] : [item]);
}

async function addAtEnd(attr, item) {
  let array = await get(attr);
  await localforage.setItem(attr, array ? [...array, item] : [item]);
}

async function updateItem(attr, item, func) {
  let index = await getIndex(attr, func);
  let array;
  if (~index) {
    array = await get(attr);
    array.splice(index, 1, item);
    await set(attr, array);
  }
}

async function reOrder(queue, startIndex, endIndex) {
  if (startIndex > -1 && endIndex < queue.length) {
    let result = [...queue];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    set("queue", result);
    return result;
  }
  return null;
}

async function log() {
  let data = await get("chartData");
  if (data && data.length <= 0) {
    await set("chartData", chartData);
    data = chartData;
  }
  let tasks = data.tasks;
  let day = new Date().getDay();
  if (tasks[7].day !== day) {
    let diff = tasks[7].day;
    while (diff++ % 7 !== day) {
      diff = diff % 7;
      tasks.splice(0, 1);
      tasks.push({ day: diff, value: 0 });
      data.cycles.splice(0, 1);
      data.cycles.push({ day: diff, value: 0 });
    }
    return await set("chartData", data);
  }
  return data;
}

async function logTask() {
  await log();
  let data = await get("chartData");
  let tasks = data.tasks;
  tasks[7].value += 1;

  return await set("chartData", data);
}

async function logCycle() {
  await log();
  let data = await get("chartData");
  let cycles = data.cycles;
  cycles[7].value += 1;

  return await set("chartData", data);
}

async function getChartData() {
  await log();
  return await localforage.getItem("chartData");
}

export {
  set,
  get,
  getIndex,
  getAll,
  removeItem,
  addAtBeginning,
  addAtEnd,
  updateItem,
  reOrder,
  log,
  logTask,
  logCycle,
  getChartData
};
