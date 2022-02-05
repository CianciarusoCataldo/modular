import { initi18n } from "@cianciarusocataldo/modular-engine";
import PKG from "../../package.json";

import initApplicationTest from "../test-suites/init.testsuite";

import AppContainerTest from "../test-suites/components/AppContainer";
import AppModalTest from "../test-suites/components/AppModal";
import AppDrawerTest from "../test-suites/components/AppDrawer";
import MainAppTests from "../test-suites/components/MainApp";
import AppErrorBoundaryTest from "../test-suites/components/AppErrorBoundary";

describe(`\n                       ## ${PKG.name
  .replace("@cianciarusocataldo/", "")
  .toLowerCase()} - v.${PKG.version} - Unit tests ##`, () => {
  initApplicationTest();
  describe("\n   Components", () => {
    initi18n({});
    MainAppTests();
    AppContainerTest();
    AppModalTest();
    AppDrawerTest();
    AppErrorBoundaryTest();
  });
});
