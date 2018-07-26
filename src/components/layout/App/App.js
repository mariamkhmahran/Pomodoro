import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Focus from "src/components/screens/Focus";
import Tasks from "src/components/screens/Tasks";
import Charts from "src/components/screens/Charts/Charts";
import Header from "src/components/layout/Header";
import TimerContext, { Context } from "src/logic/TimerContext";
import TasksContext, { ContextTasks } from "src/logic/TasksContext";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <TasksContext>
          <ContextTasks.Consumer>
            {({ addCycle }) => (
              <TimerContext addCycle={addCycle}>
                <Context.Consumer>
                  {({ isTimerRunning }) => (
                    <div className={`App ${isTimerRunning ? "ON" : ""}`}>
                      <Header />
                      <Switch>
                        <Route exact path="/" component={Focus} />
                        <Route exact path="/tasks" component={Tasks} />
                        <Route exact path="/charts" component={Charts} />
                      </Switch>
                    </div>
                  )}
                </Context.Consumer>
              </TimerContext>
            )}
          </ContextTasks.Consumer>
        </TasksContext>
      </HashRouter>
    );
  }
}
// class UpdateBlocker extends React.PureComponent {
//   render() {
//     return this.props.children;
//   }
// }
export default App;
