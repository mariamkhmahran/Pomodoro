import React from "react";
import moment from "moment";
import { Context } from "src/logic/TimerContext";

const Clock = () => (
  <div>
    <Context.Consumer>
      {({ remainigTime }) => (
        <h1 id="clock">{moment(remainigTime).format("mm:ss")}</h1>
      )}
    </Context.Consumer>
  </div>
);

export default Clock;
