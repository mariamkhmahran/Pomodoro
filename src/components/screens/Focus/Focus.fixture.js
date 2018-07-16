import Focus from "src/components/screens/Focus/Focus";
import React from "react";
import TimerContext from "src/logic/TimerContext";

export default {
  component: function provider(props) {
    return (
      <TimerContext>
        <Focus {...props} />
      </TimerContext>
    );
  },
  state: {
    queue: [
      {
        name: "Pomodoro App",
        cyclesDone: 5,
        estimatedTime: 20,
        deadline: "1/7/2018",
        done: false
      },
      {
        name: "new task",
        cyclesDone: 1,
        estimatedTime: 20,
        deadline: "1/7/2018",
        done: false
      },
      {
        name: "another task",
        cyclesDone: 2,
        estimatedTime: 20,
        deadline: "1/7/2018",
        done: false
      }
    ]
  },
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
};
