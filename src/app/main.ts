import {
  Config,
  initStore,
  initi18n,
  requestRoute,
} from "@cianciarusocataldo/modular-engine";

import {
  defaultTheme,
  defaultAppConfig,
  defaultEngineConfig,
} from "./constants/default-configs";
import { uiProperties } from "./constants/ui-properties";

import { AppConfig, Init, Theme } from "./types";

import { addStyle, printDev } from "./utils";

/**
 * Init the modular main application, with given configs. If some configs are not given, will look for default config files:
 * - `app.config.js` for app setup
 * - `engine.config.js` for engine (state and localization) setup
 * - `theme.config.json` for app custom theme
 *
 * If these files are not present in the same folder where this function is called, default internal configs will be used instead.
 * Use the `onComplete` callback to render the final app component.
 *
 * @param {AppConfig} appConfig
 * @param {Config} engine engine config (to setup internal redux store and i18n system)
 * @param {(App: JSX.Element) => any} onComplete custom callback called at the end of the init process. Receives as input parameter the final application component, already configured
 * @param {()=>any} onStart custom callback called at the start of the init process, before any other action.
 * @param {Theme} theme app custom theme
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright 2022 Cataldo Cianciaruso
 */
export const initApplication: Init = ({
  appConfig: inputAppConfig,
  engine: inputEngineConfig,
  onComplete,
  onStart,
  theme: inputTheme,
}) => {
  let theme: Theme = defaultTheme;
  let config: AppConfig = defaultAppConfig;
  let engineConfig: Config = defaultEngineConfig;

  onStart && onStart();

  if (inputTheme) {
    theme = inputTheme;
  } else {
    try {
      /*istanbul ignore next */
      theme = require("theme.config.json");
    } catch (e) {
      printDev("theme.config file not found, using default theme");

      theme = defaultTheme;
    }
  }

  const uiTheme = theme.ui || {};
  let uiStyle = "";
  if (uiTheme.dark) {
    if (uiTheme.default.background) {
      uiStyle += `${uiProperties.default.background}: ${uiTheme.default.background}; `;
    }
    if (uiTheme.dark.background) {
      uiStyle += `${uiProperties.dark.background}: ${uiTheme.dark.background}; `;
    }
  }

  const bodyTheme = theme.body || defaultTheme.body;

  let customStyle: string = `
  * {
    ${uiStyle}
  }

  body.light { background: ${
    bodyTheme.default || defaultTheme.body.default
  }; } body.dark { background: ${bodyTheme.dark || defaultTheme.body.dark}; }
  /* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: linear-gradient(to right, #2d3748, #1d232e);
}

*::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 20px;
  border: 3px solid #c0c0c0;
}
`;

  addStyle(customStyle);

  if (inputEngineConfig) {
    engineConfig = inputEngineConfig;
  } else {
    try {
      /*istanbul ignore next */
      engineConfig = require("engine.config").default;
    } catch (e) {
      printDev("engine.config file not found, using default engine config");
      engineConfig = defaultEngineConfig;
    }
  }

  window.document.body.classList.add(
    engineConfig.redux.darkMode ? "dark" : "light"
  );

  initi18n(engineConfig);

  const { store, history } = initStore({
    config: engineConfig,
  });

  let initialRoute: string | null = null;

  return import("./components/MainApp").then(({ default: MainApp }) => {
    if (inputAppConfig) {
      config = inputAppConfig;
    } else {
      try {
        /*istanbul ignore next */
        config = require("app.config").default;
      } catch (e) {
        printDev("app.config file not found, using default app config");
        config = defaultAppConfig;
      }
    }

    const App = MainApp({
      store,
      history,
      config,
      engine: engineConfig.redux,
      theme,
    });

    onComplete && onComplete(App);

    /*istanbul ignore next */
    if (config.useQueryParams) {
      if (window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        initialRoute = urlParams.get("to");

        if (
          initialRoute &&
          Object.values(store.getState().config.router.pages).includes(
            initialRoute
          )
        ) {
          store.dispatch(
            requestRoute(store.getState().config.router.basename + initialRoute)
          );
        } else {
          store.dispatch(
            requestRoute(
              store.getState().config.router.basename +
                store.getState().config.router.homePage
            )
          );
        }
      }
    }

    return {
      App,
    };
  });
};
