import React from "react";
import { mount } from "enzyme";
import Modal from "src/components/screens/Tasks/Modal";

const addTask = jest.fn();
const onClose = jest.fn();

test("should render correctly", () => {
  const wrapper = mount(<Modal isOpen={false} />);
  let isOpen = wrapper
    .find("div")
    .at(0)
    .getDOMNode()
    .getAttribute("data-is-open");
  expect(isOpen).toEqual("false");
});

test("Modal.addTask", () => {
  const wrapper = mount(<Modal addTask={addTask} onClose={onClose} />, {
    attachTo: document.body
  });
  let onclick = jest.fn();
  wrapper.instance().showSnackbar = onclick;
  wrapper
    .find("button")
    .at(0)
    .simulate("click");
  expect(addTask).toHaveBeenCalledTimes(0);
  expect(onclick).toHaveBeenCalledTimes(1);

  document.getElementById("name").value = "new task";
  document.getElementById("cycles").value = 6;
  document.getElementById("deadline").value = new Date();

  wrapper
    .find("button")
    .at(0)
    .simulate("click");
  expect(addTask).toHaveBeenCalledTimes(1);
  expect(onclick).toHaveBeenCalledTimes(1);
});

test("Modal.showSnackbar", async () => {
  const wrapper = mount(<Modal isOpen={true} onClose={onClose} />, {
    attachTo: document.body
  });
  wrapper.instance().showSnackbar();
  let x = document.querySelector("#snackbar");

  expect(x.className).toEqual("show");
  await wait(3001);
  expect(x.className).toEqual("");
});

test("Modal.closeModal", () => {
  const wrapper = mount(<Modal isOpen={true} onClose={onClose} />, {
    attachTo: document.body
  });
  let modal = document.querySelector(".modal");

  wrapper.find(".modal__close").simulate("click");
  expect(modal.style.display).toEqual("");
});

test("Modal.clearFields", () => {
  const wrapper = mount(
    <Modal addTask={addTask} open={true} onClose={jest.fn()} />
  );
  let instance = wrapper.instance();
  let clear = jest.fn();
  instance.clearFields = clear;

  wrapper
    .find("span")
    .at(0)
    .simulate("click");
  expect(clear).toHaveBeenCalledTimes(1);
});

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}
