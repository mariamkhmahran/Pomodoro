// cosmos.proxies.js
import createContextProxy from "react-cosmos-context-proxy";
import createReactRouterProxy from "react-cosmos-router-proxy";
import PropTypes from "prop-types";

const ContextProxy = createContextProxy({
  childContextTypes: {
    remainingTime: PropTypes.number.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    isTimerRunning: PropTypes.bool.isRequired,
    endOfCycle: PropTypes.bool.isRequired,
  },
});

export default [
  ContextProxy,
  createReactRouterProxy(),
  // ...other proxies
];
