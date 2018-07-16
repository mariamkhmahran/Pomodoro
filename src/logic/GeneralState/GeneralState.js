import localforage from "localforage";

async function set(attr, value, callback) {
  await localforage.setItem(attr, value, callback);
  return value;
}

async function get(attr, callback) {
  return await localforage.getItem(attr, callback);
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
  let cycles = await get("cycles");

  if (callback) {
    Promise.all([tasks, done, queue, cycles]).then(
      callback({ tasks, queue, done, cycles })
    );
  }
  return { tasks, done, queue, cycles };
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
  await localforage.setItem(attr, [item, ...array]);
}

async function addAtEnd(attr, item) {
  let array = await get(attr);
  await localforage.setItem(attr, [...array, item]);
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

export {
  set,
  get,
  getIndex,
  getAll,
  removeItem,
  addAtBeginning,
  addAtEnd,
  updateItem,
  reOrder
};
