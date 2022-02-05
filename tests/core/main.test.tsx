import PKG from "../../package.json";
import MainAppTests from "../test-suites/components/MainApp";
import initApplicationTest from "../test-suites/init.testsuite";

describe(`\n                       ## ${PKG.name
  .replace("@cianciarusocataldo/", "")
  .toLowerCase()} - v.${PKG.version} - Unit tests ##`, () => {
  initApplicationTest();
  describe("\n   Components", () => {
    MainAppTests();
  });
});
