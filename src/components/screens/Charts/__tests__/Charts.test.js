import React from "react";
import { shallow } from "enzyme";
import Charts from "src/components/screens/Charts";

test("Charts.render", () => {
  const wrapper = shallow(<Charts />, { lifecycleExperimental: true });

  expect(wrapper).toMatchSnapshot();
});
