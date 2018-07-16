import React from "react";
import Clock from "./Clock";
import QueueContainer from "./QueueContainer";

const Focus = () => (
  <div className="router_output">
    <div className="Focus Main">
      <Clock />
      <QueueContainer />
    </div>
  </div>
);

export default Focus;
