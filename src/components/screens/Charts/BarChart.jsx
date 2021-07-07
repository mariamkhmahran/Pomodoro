import React from "react";
import { Bar } from "react-chartjs-2";
import * as GeneralState from "../../../logic/GeneralState";

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var chartOptions = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          color: "white"
        },
        ticks: {
          beginAtZero: true,
          fontColor: "white"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          color: "white"
        },
        ticks: {
          beginAtZero: true,
          display: false
        }
      }
    ]
  }
};

export default class BarChart extends React.Component {
  state = {
    data: {
      labels: [],
      datasets: [
        {
          label: "Cycles",
          backgroundColor: "#F36969",
          borderColor: "#F36969",
          data: []
        },
        {
          label: "Tasks",
          backgroundColor: "#8EB7EE",
          borderColor: "#8EB7EE",
          data: []
        }
      ]
    }
  };

  async componentDidMount() {
    let newData = await GeneralState.getChartData();
    let data = this.state.data;
    data.labels = newData.cycles.map(d => weekday[d.day]);
    data.datasets[0].data = newData.cycles.map(d => d.value);
    data.datasets[1].data = newData.tasks.map(d => d.value);
    this.setState({ data });

    this.props.onDidMount && this.props.onDidMount(this);
  }

  render() {
    return (
      <div
        style={{
          width: "90%",
          height: "100%"
        }}>
        <Bar
          id="chart"
          data={this.state.data}
          options={chartOptions}
          height={500}
          width={700}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}
