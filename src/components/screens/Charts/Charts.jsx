import React from "react";
import BarChart from "./BarChart";

export default class Charts extends React.Component {
  render() {
    return (
      <div className="router_output">
        <div className="subHeader">
          <span className="subtitle">Charts</span>
        </div>
        <div className="Main charts">
          <div>
            <div
              className="transparent_box"
              style={{ height: "450px", width: "100%" }}>
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
