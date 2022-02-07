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
