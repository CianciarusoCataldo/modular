import { initi18n, initStore } from "@cianciarusocataldo/modular-engine";
import PKG from "../../package.json";

import initApplicationTest from "../test-suites/init";

//Tests
import AppContainerTest from "../test-suites/components/AppContainer";
import AppModalTest from "../test-suites/components/AppModal";
import AppDrawerTest from "../test-suites/components/AppDrawer";
import MainAppTests from "../test-suites/components/MainApp";
import AppErrorBoundaryTest from "../test-suites/components/AppErrorBoundary";

describe(`\n                       ## Modular - v.${PKG.version} - Unit tests ##`, () => {
  initApplicationTest();
  describe("\n   Components", () => {
    initi18n({});
    const { history, store } = initStore({
      config: { redux: { ui: true, modal: true } },
    });

    MainAppTests(store, history);
    AppContainerTest(store);
    AppModalTest(store);
    AppDrawerTest(store);
    AppErrorBoundaryTest();
  });
});
