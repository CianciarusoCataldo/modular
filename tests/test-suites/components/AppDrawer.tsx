import React from "react";

import { Store } from "redux";

import { mount } from "enzyme";
import { Provider } from "react-redux";

import { openDrawer } from "@cianciarusocataldo/modular-engine";

import AppDrawer from "../../../src/app/components/AppDrawer";

const AppDrawerTest = (store: Store) => {
  describe("\n     AppDrawer\n", () => {
    test("renders correctly when opened", () => {
      store.dispatch(openDrawer());

      let wrapper = mount(
        <Provider store={store}>
          <div className="app-container">
            <AppDrawer elements={[]} children={<div />} />
          </div>
        </Provider>
      );
      expect(wrapper.find("#modular-drawer").length).toBeGreaterThan(0);
    });

    test("renders correctly when closed", () => {
      let wrapper = mount(
        <Provider store={store}>
          <div className="app-container">
            <AppDrawer elements={[]} children={<div />} />
          </div>
        </Provider>
      );
      wrapper.find(".close-button").at(1).simulate("click");

      expect(store.getState().modal.isVisible).toBe(false);
    });
  });
};

export default AppDrawerTest;
