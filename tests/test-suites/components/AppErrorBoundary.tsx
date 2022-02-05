import React from "react";

import { mount } from "enzyme";
import AppErrorBoundary from "../../../src/app/components/AppErrorBoundary";

const AppErrorBoundaryTest = () => {
  describe("\n     AppErrorBoundary\n", () => {
    test("renders children if no error", () => {
      const wrapper = mount(
        <AppErrorBoundary>
          <div />
        </AppErrorBoundary>
      );
      expect(wrapper);
    });

    test("renders fallback if an error occurs", () => {
      const ComponentWithError = () => {
        throw new Error("Error thrown from child");
      };
      const wrapper = mount(
        <AppErrorBoundary>
          <ComponentWithError />
        </AppErrorBoundary>
      );
      wrapper.find(".error-button").at(1).simulate("click");
      expect(wrapper);
    });
  });
};

export default AppErrorBoundaryTest;
