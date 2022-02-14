import "react-toastify/dist/ReactToastify.css";

import React from "react";

import { AppConfig, Theme } from "../../types";

import { Provider } from "react-redux";
import { History } from "history";
import { Store } from "@reduxjs/toolkit";

import ErrorBoundary from "../AppErrorBoundary";
import { parseThemeField } from "../../utils";
import { defaultTheme } from "../../constants/default-configs";

/**
 * Modular main app, rendered at the end of the init process.
 *
 * @param {Store} store redux store, used to drive app components (enhanced with `modular-engine`)
 * @param {History} history history object, used for routing logic
 * @param {AppConfig} config app config, to determine which components will be rendered and where
 * @param {{ ui?: boolean; modal?: boolean }} engine app engine config, the same config file passed to modular-engine initStore function
 * @param {Theme} theme app custom theme, to customize some UI parts
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
const MainApp = ({
  store,
  history,
  engine,
  config,
  theme,
}: {
  store: Store;
  history: History;
  engine: { ui?: boolean; modal?: boolean };
  config: AppConfig;
  theme: Theme;
}) => {
  const CustomContent = config.content;
  const HeaderContent = config.header;
  const FooterContent = config.footer;
  const DrawerContent = config.drawer?.content;
  const DrawerLogo = config.drawer?.logo;
  const Preloader = config.preloader;
  const ThemedContainer = React.lazy(() => import("../ThemedContainer"));
  const AppDrawer = React.lazy(() => import("../AppDrawer"));
  const AppModal = React.lazy(() => import("../AppModal"));
  const AppRouter = React.lazy(() => import("../AppRouter"));
  const ToastContainer = React.lazy(() => import("../ToastContainer"));

  return (
    <React.Suspense fallback={Preloader ? <Preloader /> : null}>
      <Provider store={store}>
        <ErrorBoundary fallback={config.error}>
          {engine.ui && <ToastContainer />}
          {engine.modal && <AppModal modals={config.modals || {}} />}
          {engine.ui && config.drawer && (
            <AppDrawer
              theme={parseThemeField(theme.drawer, defaultTheme.drawer)}
              logo={DrawerLogo && <DrawerLogo />}
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
            {HeaderContent && (
              <ThemedContainer
                theme={parseThemeField(theme.header, defaultTheme.header)}
                wrapper="header"
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <HeaderContent />
              </ThemedContainer>
            )}
            {config.pagesRendering && (
              <AppRouter
                renderCallback={config.pagesRendering}
                history={history}
                theme={parseThemeField(theme.router, defaultTheme.router)}
              />
            )}
            {CustomContent && <CustomContent />}
            {FooterContent && (
              <ThemedContainer
                theme={parseThemeField(theme.footer, defaultTheme.footer)}
                wrapper="footer"
                style={{
                  bottom: "0px",
                  position: "absolute",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <FooterContent />
              </ThemedContainer>
            )}
          </div>
        </ErrorBoundary>
      </Provider>
    </React.Suspense>
  );
};

export default MainApp;
