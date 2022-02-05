import { mount } from "enzyme";
import { initApplication } from "../../src";

const runTest = () => {
  describe("\n   initApplication\n", () => {
    test("init with default config", () => {
      initApplication({
        onComplete: (App) => {
          const wrapper = mount(App);
          expect(wrapper);
        },
      });
    });
  });
};

export default runTest;
