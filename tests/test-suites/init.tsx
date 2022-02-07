import React from "react";

import { mount } from "enzyme";

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
      process.env.NODE_ENV === "development";

      initApplication({
        onComplete: (App) => {
          const wrapper = mount(App);
          expect(wrapper);
        },
      });
    });

    test("init with given config", () => {
      process.env.NODE_ENV === "test";

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

    test("onStart callback is called at the start of the init process", () => {
      const onStartStub = jest.fn();
      initApplication({
        engine: { redux: defaultEngineConfig },
        appConfig: appConfig,
        theme: defaultTheme,
        onStart: () => onStartStub(),
        onComplete: (App) => {
          expect(onStartStub).toBeCalled;
        },
      });
    });
  });
};

export default runTest;
