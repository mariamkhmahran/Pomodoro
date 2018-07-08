import React from "react";
import TimerContext from "src/logic/TimerContext";
import Focus from "src/components/screens/Focus/Focus";

export default {
  component: TimerContext,
  props: { children: <Focus /> },
  state: {
    remainigTime: 25 * 60 * 1000,
    startTimer: function() {
      console.log("heyyyy");
    },
    stopTimer: function() {
      console.log("heyyyy");
    },
    isTimerRunning: false,
    endOfCycle: false
  }
};
