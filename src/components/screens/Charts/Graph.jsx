var React = require("react");
var CanvasJSReact = require("./canvasjs.react");
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Graph extends React.Component {
  toggleDataSeries = e => {
    if (e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  };

  render() {
    const options = {
      theme: "light1",
      animationEnabled: true,
      axisX: {
        title: ""
      },
      axisY: {
        title: "",
        titleFontColor: "transparent",
        lineColor: "white",
        labelFontColor: "transparent",
        tickColor: "transparent",
        includeZero: true
      },
      axisY2: {
        title: "",
        titleFontColor: "transparent",
        lineColor: "transparent",
        labelFontColor: "transparent",
        tickColor: "transparent",
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [
        {
          type: "spline",
          name: "tasks",
          showInLegend: false,
          xValueFormatString: "M YYYY",
          yValueFormatString: "#,##0 Units",
          dataPoints: [
            { x: new Date(2018, 1, 1), y: 2 },
            { x: new Date(2018, 1, 2), y: 3 },
            { x: new Date(2018, 1, 3), y: 1 },
            { x: new Date(2018, 1, 4), y: 5 },
            { x: new Date(2018, 1, 5), y: 5 },
            { x: new Date(2018, 1, 6), y: 3 },
            { x: new Date(2018, 1, 7), y: 5 },
            { x: new Date(2018, 1, 8), y: 1 },
            { x: new Date(2018, 1, 9), y: 4 },
            { x: new Date(2018, 1, 10), y: 2 },
            { x: new Date(2018, 1, 11), y: 2 },
            { x: new Date(2018, 1, 12), y: 2 }
          ]
        },
        {
          type: "spline",
          name: "cycles",
          axisYType: "secondary",
          showInLegend: false,
          xValueFormatString: "MM YYYY",
          yValueFormatString: "$#,##0.#",
          dataPoints: [
            { x: new Date(2018, 1, 1), y: 12 },
            { x: new Date(2018, 1, 2), y: 10 },
            { x: new Date(2018, 1, 3), y: 10 },
            { x: new Date(2018, 1, 4), y: 11 },
            { x: new Date(2018, 1, 5), y: 10 },
            { x: new Date(2018, 1, 6), y: 8 },
            { x: new Date(2018, 1, 7), y: 8 },
            { x: new Date(2018, 1, 8), y: 9 },
            { x: new Date(2018, 1, 9), y: 10 },
            { x: new Date(2018, 1, 10), y: 11 },
            { x: new Date(2018, 1, 11), y: 12 },
            { x: new Date(2018, 1, 12), y: 12 }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
      </div>
    );
  }
}
