import "react-toastify/dist/ReactToastify.css";

import { Theme } from "./types";

import { render } from "react-dom";
import React, { Suspense } from "react";

import { DrawerElement } from "@cianciarusocataldo/modular-ui";

import { RouteProps } from "react-router-dom";
import { Provider } from "react-redux";
import { History } from "history";
import { Store } from "@reduxjs/toolkit";

import { ToastContainer } from "react-toastify";
import { setDarkMode } from "@cianciarusocataldo/modular-engine";
import {
  AppContainer,
  AppDrawer,
  AppModal,
  AppRouter,
  DarkModeSwitcher,
  LanguageSelector,
} from "../predefined/components";

/** Render Modular-app */
const initApp = ({
  store,
  history,
  config,
  engine,
  theme,
}: {
  store: Store;
  history: History;
  engine: Record<any, any> & { ui?: boolean; modal?: boolean };
  config: {
    pagesRendering?: (route: string) => RouteProps["component"];
    darkMode?: boolean;
    drawer?: {
      content: () => JSX.Element;
      logo: () => JSX.Element;
      elements: DrawerElement[];
    };
    modals?: Record<string, () => JSX.Element>;
    header?: () => JSX.Element;
    footer?: () => JSX.Element;
    content?: () => JSX.Element;
  };
  theme: Theme;
}) => {
  engine.ui &&
    config.darkMode !== undefined &&
    store.dispatch(setDarkMode(config.darkMode));

  const CustomContent = config.content || (() => <div />);
  const HeaderContent = config.header || (() => <div />);
  const FooterContent = config.footer || (() => <div />);
  const DrawerContent = config.drawer?.content;
  const DrawerLogo = config.drawer?.logo;

  render(
    <Suspense fallback={<div className="preloader"></div>}>
      <ToastContainer />
      <Provider store={store}>
        {engine.modal && <AppModal modals={config.modals || {}} />}
        {engine.ui && config.drawer && (
          <AppDrawer
            logo={DrawerLogo && <DrawerLogo />}
            elements={config.drawer.elements && config.drawer.elements}
          >
            {DrawerContent && <DrawerContent />}
          </AppDrawer>
        )}
        <div
          id="app-container"
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {config.header && (
            <AppContainer
              wrapper="header"
              className={theme.header.className}
              style={{
                width: "100%",
                overflow: "hidden",
                height: theme.header.height,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <LanguageSelector />
                  {engine.ui && <DarkModeSwitcher />}
                </div>
              </div>
              <HeaderContent />
            </AppContainer>
          )}
          {config.pagesRendering && (
            <AppRouter
              renderCallback={config.pagesRendering}
              history={history}
              className={theme.router.className}
              style={{
                height: theme.router.height,
                width: "100%",
                overflow: "auto",
              }}
            />
          )}
          <CustomContent />
          {config.footer && (
            <AppContainer
              wrapper="footer"
              className={theme.router.className}
              style={{
                bottom: "0px",
                position: "absolute",
                overflow: "hidden",
                width: "100%",
                height: theme.footer.height,
              }}
            >
              <FooterContent />
            </AppContainer>
          )}
        </div>
      </Provider>
    </Suspense>,
    document.getElementById("root")
  );

  let Preloader = document.getElementById("preloader");
  if (Preloader) Preloader.style.visibility = "hidden";
};

export default initApp;
