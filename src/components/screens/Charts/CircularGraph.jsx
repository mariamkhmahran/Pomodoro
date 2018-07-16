import React from "react";

export default class CircularGraph extends React.Component {
  componentDidMount() {
    console.log(this.props);
    let { x, y, id, percentage } = this.props;
    this.setState({ percentage: percentage });

    let arc = percentage * 6.3 + -1.6;
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 60, arc, 1.5 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  render() {
    let { id } = this.props;
    return <canvas id={id} width="200" height="200" style={{ height: "250px", width: "250px" }} />;
  }
}
