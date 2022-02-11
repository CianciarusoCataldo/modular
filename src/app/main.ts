import {
  Config,
  initStore,
  initi18n,
} from "@cianciarusocataldo/modular-engine";

import { AppConfig, Theme } from "./types";

/*istanbul ignore next */
const printDev = (output: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(output);
  }
};

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
  redux: { ui: true, modal: true, epics: [], reducers: {}, preload: {} },
};

const defaultAppConfig = {};

/**
 * Init the modular main application, with given configs. If some config is not given, will look for default config files:
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
export const initApplication = ({
  appConfig: inputAppConfig,
  engine: inputEngineConfig,
  onComplete,
  onStart,
  theme: inputTheme,
}: {
  appConfig?: AppConfig;
  engine?: Config;
  onComplete: (App: JSX.Element) => any;
  onStart?: () => any;
  theme?: Theme;
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

  initi18n(engineConfig);

  const { store, history } = initStore({
    config: engineConfig,
  });

  import("./components/MainApp").then(({ default: MainApp }) => {
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

    onComplete(
      MainApp({
        store,
        history,
        config,
        engine: engineConfig.redux,
        theme,
      })
    );
  });
};
