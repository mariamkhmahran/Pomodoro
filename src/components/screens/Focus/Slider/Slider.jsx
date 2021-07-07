import React from "react";
import "./Slider.css";
import Slider from "react-rangeslider";

export default class ClockSlider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0,
    };
  }

  handleOnChange = (value) => {
    this.props.setRemainingTime(value * 60 * 1000);
  };

  render() {
    let { remainingTime } = this.props;
    remainingTime = remainingTime / (60 * 1000);
    return (
      <Slider
        min={0}
        max={60}
        value={remainingTime}
        orientation="horizontal"
        onChange={this.handleOnChange}
        tooltip={false}
      />
    );
  }
}
