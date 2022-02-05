import React from "react";

import { initStore } from "@cianciarusocataldo/modular-engine";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import AppContainer from "../../../src/app/components/AppContainer";

const AppContainerTest = () => {
  const { store } = initStore({
    config: { redux: { ui: true, modal: true } },
  });
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
