import React from "react";

export default class Modal extends React.Component {
  showModal = () => {
    if (!this.props.open) {
      return;
    }
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
    let self = this;
    span.onclick = function() {
      self.clearFields();
      modal.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  clearFields() {
    console.log("clearing..");
    document.getElementById("name").value = "";
    document.getElementById("cycles").value = "";
    document.getElementById("deadline").value = null;
  }

  addTask() {
    let name = document.getElementById("name").value,
      cycles = document.getElementById("cycles").value,
      deadline = document.getElementById("deadline").value;

    this.props.addTask({ name, cycles, deadline });
    this.clearFields();
  }

  render() {
    this.showModal();
    return (
      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <span className="subtitle orange">ADD NEW TASK</span>
          <input className="inputField" type="text" id="name" placeholder="Name" />
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
            <button className="btn addTask" onClick={() => this.addTask()}>
              Add Task
            </button>
          </div>
        </div>
      </div>
    );
  }
}
