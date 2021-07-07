import React from "react";
import timer_icon from "../../pics/timer_icon.png";
import tasks_icon from "../../pics/tasks_icon.svg";
import charts_icon from "../../pics/charts_icon.svg";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="Header">
    <Link to="/">
      <div className="meta">
        <img className="icon" id="timer_icon" src={timer_icon} alt="pomodoro" />
        <h1 className="Title">POMODORO</h1>
      </div>
    </Link>
    <div>
      <Link to="/tasks">
        <img className="icon" id="header_icon" src={tasks_icon} alt="tasks" />
      </Link>
      <Link to="/charts">
        <img className="icon" id="header_icon" src={charts_icon} alt="charts" />
      </Link>
    </div>
  </div>
);

export default Header;
