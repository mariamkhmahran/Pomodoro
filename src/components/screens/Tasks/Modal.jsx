import React from "react";

import "./Modal.css";

export default class Modal extends React.Component {
  onClose = () => {
    this.clearFields();
    this.props.onClose();
  };

  clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("cycles").value = "";
    document.getElementById("deadline").value = null;
  }

  addTask = () => {
    if (
      document.querySelector("#name").value === "" ||
      document.querySelector("#cycles").value === "" ||
      document.querySelector("#deadline").value === null
    ) {
      this.showSnackbar();
      return;
    }

    let name = document.querySelector("#name").value,
      cycles = document.querySelector("#cycles").value,
      deadline = document.querySelector("#deadline").value;

    this.props.addTask({ name, cycles, deadline });
    this.onClose();
  };

  showSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  render() {
    const { isOpen } = this.props;
    const { addTask, onClose } = this;
    return (
      <div className="modal" data-is-open={isOpen}>
        <div className="modal__screen" onClick={onClose} />
        <div id="snackbar">Please fill all information..</div>
        <div className="modal__content">
          <span onClick={onClose} className="modal__close">
            &times;
          </span>
          <span className="subtitle orange">ADD NEW TASK</span>
          <input
            className="inputField"
            type="text"
            id="name"
            placeholder="Name"
          />
          <input
            className="inputField"
            type="text"
            id="cycles"
            placeholder="Estimated total number of cycles"
          />
          <input
            className="inputField"
            type="date"
            id="deadline"
            placeholder="Deadline"
          />
          <div>
            <button className="btn addTask" onClick={addTask}>
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  }
}
