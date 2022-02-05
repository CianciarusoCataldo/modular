import React from "react";
import { mount } from "enzyme";

import { initStore } from "@cianciarusocataldo/modular-engine";

import MainApp from "../../../src/app/components/MainApp";

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
  pagesRendering: () => React.lazy(() => import("../constants/TestComponent")),
  content: () => <div />,
  modals: { test: () => <div /> },
  preloader: () => (
    <div>
      <div className="preloader" />
    </div>
  ),
  header: () => <div />,
  footer: () => <div />,
  drawer: {
    content: () => <div />,
    logo: () => <div />,
    elements: [],
  },
};

const MainAppTests = () => {
  describe("\n     MainApp\n", () => {
    test("with default config params", () => {
      const { store, history } = initStore({
        config: { redux: { ui: false, modal: false } },
      });
      const testProps = {
        theme: defaultTheme,
        store,
        history,
        config: { content: () => <div /> },
        engine: { ui: false, modal: false },
      };
      const wrapper = mount(<MainApp {...testProps} />);
      expect(wrapper);
    });

    test("with defined config params", () => {
      const { store, history } = initStore({
        config: { redux: defaultEngineConfig },
      });
      const testProps = {
        config: appConfig,
        engine: defaultEngineConfig,
        theme: defaultTheme,
        store,
        history,
      };
      const wrapper = mount(<MainApp {...testProps} />);
      expect(wrapper);
    });
  });
};

export default MainAppTests;
