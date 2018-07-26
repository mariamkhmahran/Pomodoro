export const storage = {};

export default {
  async getItem(key) {
    let value;
    await wait(10);
    if (storage[key]) {
      value = Array.isArray(storage[key])
        ? storage[key]
        : JSON.parse(storage[key]);
    }
    return value ? value : null;
  },
  async setItem(key, value) {
    await wait(10);
    let temp;
    if (Array.isArray(value)) {
      temp = value.slice();
    } else if (typeof value === "object") {
      temp = JSON.stringify(value);
    } else {
      temp = value;
    }
    storage[key] = temp;
  },
  async removeItem(key) {
    await wait(10);
    delete storage[key];
  }
};

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}
