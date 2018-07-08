import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "src/components/layout/App";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
