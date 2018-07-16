import React from "react";
import Graph from "./Graph";
import CircularGraph from "./CircularGraph";
import BarChart from "./BarChart";
import localforage from "localforage";

export default class Charts extends React.Component {
  componentDidMount() {
    localforage.getItem("cycles", (err, cycles) => {
      this.setState(() => ({ cyclesDone: cycles }));
    });
  }
  state = {
    cyclesDone: 0
  };

  render() {
    return (
      <div className="router_output">
        <div className="subHeader">
          <span className="subtitle">Charts</span>
        </div>
        <div className="Main charts">
          <div>
            <div className="transparent_box" style={{ height: "450px", width: "100%" }}>
              <BarChart />
            </div>
            <div className="transparent_box" style={{ height: "250px", width: "48%" }} />
            <div className="transparent_box third" style={{ height: "250px", width: "48%" }}>
              <CircularGraph id={"rounds"} x={120} y={95} percentage={this.state.cyclesDone % 4} />
              <CircularGraph id={"goal"} x={80} y={95} percentage={this.state.cyclesDone / 12} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
