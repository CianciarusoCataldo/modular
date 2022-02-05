import React from "react";

import {
  closeDrawer,
  initStore,
  openDrawer,
} from "@cianciarusocataldo/modular-engine";
import { mount } from "enzyme";

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
  modals: {},
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

    test(" with defined config params", () => {
      const { store, history } = initStore({
        config: { redux: defaultEngineConfig },
      });
      store.dispatch(openDrawer());
      const testProps = {
        config: appConfig,
        engine: defaultEngineConfig,
        theme: defaultTheme,
        store,
        history,
      };
      const wrapper = mount(<MainApp {...testProps} />);
      store.dispatch(openDrawer());
      store.dispatch(closeDrawer());

      expect(wrapper);
    });
  });
};

export default MainAppTests;
