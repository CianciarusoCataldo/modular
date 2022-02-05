import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import AppDrawer from "../../../src/app/components/AppDrawer";
import {
  combineReducers,
  configureStore,
  createReducer,
} from "@reduxjs/toolkit";

const AppDrawerTest = () => {
  const store = configureStore({
    preloadedState: { ui: { isDrawerOpen: true } },
    reducer: combineReducers({
      ui: createReducer({ isDrawerOpen: true }, () => {}),
    }),
  });
  describe("\n     AppDrawer\n", () => {
    test("renders correctly", () => {
      let wrapper = mount(
        <Provider store={store}>
          <div className="app-container">
            <AppDrawer elements={[]} children={<div />} />
          </div>
        </Provider>
      );

      wrapper.find(".close-button").at(1).simulate("click");

      expect(wrapper);
    });
  });
};

export default AppDrawerTest;
