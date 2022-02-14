import React from "react";

import { Store } from "redux";

import { Provider } from "react-redux";
import { mount } from "enzyme";

import AppContainer from "../../../src/app/components/ThemedContainer";

const AppContainerTest = (store: Store) => {
  describe("\n     ThemedContainer\n", () => {
    test("renders correctly", () => {
      const wrapper = mount(
        <Provider store={store}>
          <AppContainer theme={{}}>
            <div />
          </AppContainer>
        </Provider>
      );
      expect(wrapper);
    });
  });
};

export default AppContainerTest;
