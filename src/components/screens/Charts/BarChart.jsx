import React from "react";
import * as d3 from "d3";

export default class BarChart extends React.Component {
  componentDidMount() {
    var svg = d3.select("svg"),
      margin = 200,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin;

    var xScale = d3
        .scaleBand()
        .range([0, width])
        .padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");
  }
  render() {
    return <svg width="600" height="500" />;
  }
}
