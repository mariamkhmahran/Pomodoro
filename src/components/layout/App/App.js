import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Focus from "src/components/screens/Focus";
import Tasks from "src/components/screens/Tasks";
import TimerContext, { Context } from "src/logic/TimerContext";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <TimerContext>
          <Context.Consumer>
            {({ isTimerRunning }) => (
              <div className={`App ${isTimerRunning ? "ON" : ""}`}>
                <Switch>
                  <Route exact path="/" component={Focus} />
                  <Route exact path="/tasks" component={Tasks} />
                </Switch>
              </div>
            )}
          </Context.Consumer>
        </TimerContext>
      </BrowserRouter>
    );
  }
}
class UpdateBlocker extends React.PureComponent {
  render() {
    return this.props.children;
  }
}
export default App;
