export const storage = {};

export default {
  async getItem(key) {
    await wait(10);
    return storage[key];
  },
  async setItem(key, value) {
    await wait(10);
    storage[key] = value;
  },
  async removeItem(key) {
    await wait(10);
    delete storage[key];
  }
};

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}
