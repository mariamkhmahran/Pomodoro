import App from "src/components/layout/App/App";

export default [
  {
    component: App,
    url: "/",
    pathname: "/",
    provideRouterProps: true,
    context: {
      remainigTime: 25 * 60 * 1000,
      startTimer: function() {
        console.log("heyyyy");
      },
      stopTimer: function() {
        console.log("heyyyy");
      },
      isTimerRunning: true,
      endOfCycle: false
    }
  }
];
