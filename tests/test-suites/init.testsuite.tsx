import { mount } from "enzyme";
import React from "react";
import { initApplication } from "../../src";

const runTest = () => {
  const defaultTheme = {
    header: {
      height: "20%",
    },
    footer: {
      height: "10%",
    },
    router: {
      height: "70%",
    },
  };

  const defaultEngineConfig = {
    ui: true,
    modal: true,
    epics: [],
    reducers: {},
    preload: {},
  };

  const appConfig = {
    content: () => <div />,
    modals: {},
    preloader: () => (
      <div>
        <div className="preloader" />
      </div>
    ),
    header: () => <div />,
    footer: () => <div />,
  };

  describe("\n   initApplication\n", () => {
    test("init with default config", () => {
      initApplication({
        onComplete: (App) => {
          const wrapper = mount(App);
          expect(wrapper);
        },
      });
    });

    test("init with given config", () => {
      initApplication({
        engine: { redux: defaultEngineConfig },
        appConfig: appConfig,
        theme: defaultTheme,
        onComplete: (App) => {
          const wrapper = mount(App);
          expect(wrapper);
        },
      });
    });
  });
};

export default runTest;
