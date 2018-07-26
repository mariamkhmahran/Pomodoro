import React from "react";
import { shallow } from "enzyme";
import BarChart from "../BarChart";
import * as GeneralState from "src/logic/GeneralState";

test("BarChart.render", () => {
  const wrapper = shallow(<BarChart />, { lifecycleExperimental: true });

  expect(wrapper).toMatchSnapshot();
});

test("BarChart.data", async () => {
  await GeneralState.log();
  const wrapper = shallow(<BarChart />, { lifecycleExperimental: true });
  let data = await GeneralState.get("chartData");
  await wait(100);

  expect(wrapper.instance().state.data.datasets[1].data).toMatchObject(
    data.tasks.map(t => t.value)
  );
});

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}
