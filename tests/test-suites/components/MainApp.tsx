import React from "react";

import { Store } from "redux";
import { History } from "history";

import { mount } from "enzyme";

import {
  defaultTheme,
  defaultEngineConfig,
} from "../../../src/app/constants/default-configs";

import MainApp from "../../../src/app/components/MainApp";

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
  },
};

const MainAppTests = (store: Store, history: History) => {
  describe("\n     MainApp\n", () => {
    test("with default config params", () => {
      const testProps = {
        theme: defaultTheme,
        store,
        history,
        config: {},
        engine: {},
      };
      const wrapper = mount(<MainApp {...testProps} />);
      expect(wrapper);
    });

    test("with defined config params", () => {
      const testProps = {
        config: appConfig,
        engine: defaultEngineConfig.redux,
        theme: { ...defaultTheme, router: {} },
        store,
        history,
      };
      const wrapper = mount(<MainApp {...testProps} />);
      expect(wrapper);
    });
  });
};

export default MainAppTests;
