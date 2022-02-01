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

const defaultAppConfig = { darkMode: false };

var theme = defaultTheme;

try {
  theme = require("theme.config.json");
} catch (e) {
  process.env.NODE_ENV === "development" &&
    console.log("Theme file not found, using default theme.");
  theme = defaultTheme;
}

export const initApplication = (callback: (App: JSX.Element) => any) => {
  let config = defaultAppConfig;
  let engineConfig = defaultEngineConfig;

  import("@cianciarusocataldo/modular-engine").then(
    ({ initStore, initi18n, setDarkMode }) => {
      try {
        engineConfig = require("engine.config").default;
      } catch {
        process.env.NODE_ENV === "development" &&
          console.log(
            "engine.config file not found, using default engine config"
          );
        engineConfig = defaultEngineConfig;
      }

      initi18n(engineConfig);

      const { store, history } = initStore({
        CONFIG: engineConfig,
        epics: engineConfig.redux
          ? engineConfig.redux.epics || []
          : defaultEngineConfig.redux.epics,
        reducers: engineConfig.redux
          ? engineConfig.redux.reducers || {}
          : defaultEngineConfig.redux.reducers,
        initialState: engineConfig.redux
          ? engineConfig.redux.preload || {}
          : defaultEngineConfig.redux.preload,
      });

      import("./components/MainApp").then(({ default: MainApp }) => {
        try {
          config = require("app.config").default;
        } catch {
          config = defaultAppConfig;
        }

        engineConfig.redux.ui &&
          config.darkMode !== undefined &&
          store.dispatch(setDarkMode(config.darkMode));

        callback(
          MainApp({
            store,
            history,
            config,
            engine: engineConfig.redux,
            theme,
          })
        );
      });
    }
  );
};
