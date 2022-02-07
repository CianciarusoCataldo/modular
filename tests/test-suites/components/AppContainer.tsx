import React from "react";

import { Store } from "redux";

import { Provider } from "react-redux";
import { mount } from "enzyme";

import AppContainer from "../../../src/app/components/AppContainer";

const AppContainerTest = (store: Store) => {
  describe("\n     AppContainer\n", () => {
    test("renders correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <AppContainer>
            <div />
          </AppContainer>
        </Provider>
      );
      expect(wrapper);
    });
  });
};

export default AppContainerTest;
