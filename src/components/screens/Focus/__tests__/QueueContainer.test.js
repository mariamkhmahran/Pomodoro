import React from "react";
import renderer from "react-test-renderer";
import QueueContainer from "src/components/screens/Focus/QueueContainer";
import * as GeneralState from "src/logic/GeneralState";
import TasksContext from "src/logic/TasksContext";
import TasksData from "src/mocks/TasksData.json";

xtest("renders correctly", async () => {
  let wrapper;
  await GeneralState.set("queue", TasksData.data);
  await new Promise((resolve, reject) => {
    wrapper = renderer.create(
      <TasksContext onDidMount={inst => resolve(inst)}>
        <QueueContainer />
      </TasksContext>
    );
  });
  wrapper = wrapper.toJSON();
  expect(wrapper).toMatchSnapshot();
});
