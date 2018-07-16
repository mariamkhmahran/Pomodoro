import context from "src/logic/TimerContext/testHelpers";

export const Context = {
  Consumer(props) {
    return props.children(context);
  }
};
