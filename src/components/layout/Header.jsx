import React from "react";
import timer_icon from "src/pics/timer_icon.png";
import tasks_icon from "src/pics/tasks_icon.svg";
import charts_icon from "src/pics/charts_icon.svg";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="Header">
    <div className="meta">
      <img id="timer_icon" src={timer_icon} alt="pomodoro" />
      <h1 className="Title">POMODORO</h1>
    </div>
    <div>
      <Link to="/tasks">
        <img id="header_icon" src={tasks_icon} alt="tasks" />
      </Link>
      <button className="no-btn-styles icon">
        <img id="header_icon" src={charts_icon} alt="charts" />
      </button>
    </div>
  </div>
);

export default Header;
