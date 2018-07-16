import { TaskCard } from "src/components/atoms/Card";

export default {
  component: TaskCard,
  props: {
    task: {
      name: "Pomodoro App",
      cyclesDone: 5,
      estimatedTime: 20,
      deadline: "1/7/2018",
      subTasks: [],
      done: false
    },
    onclick: function() {
      alert("hii");
    }
  }
};
