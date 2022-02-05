import { initStore, openModal } from "@cianciarusocataldo/modular-engine";
import { mount } from "enzyme";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import AppModal from "../../../src/app/components/AppModal";

const AppModalTest = () => {
  const { store } = initStore({
    config: { redux: { ui: true, modal: true } },
  });
  describe("\n     AppModal\n", () => {
    test("renders correctly", () => {
      let wrapper = mount(
        <Provider store={store}>
          <AppModal modals={{}} />
        </Provider>
      );
      expect(wrapper);
      store.dispatch(openModal("test"));
      wrapper = mount(
        <Suspense fallback={<div />}>
          <Provider store={store}>
            <div>
              <AppModal modals={{ test: () => <div>test form</div> }} />
            </div>
            <div>test div</div>
          </Provider>
        </Suspense>
      );
      wrapper.find(".close-button").at(1).simulate("click");
      expect(wrapper);
    });
  });
};

export default AppModalTest;
