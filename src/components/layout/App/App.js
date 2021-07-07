import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Focus from "../../screens/Focus";
import Clk from "../../screens/Focus/Slider";
import Tasks from "../../screens/Tasks";
import Charts from "../../screens/Charts/Charts";
import Header from "../Header";
import TimerContext, { Context } from "../../../logic/TimerContext";
import TasksContext, { ContextTasks } from "../../../logic/TasksContext";

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
                        <Route exact path="/clk" component={Clk} />
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
