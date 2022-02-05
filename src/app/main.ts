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
  onComplete,
}: {
  onComplete: (App: JSX.Element) => any;
}) => {
  let theme = defaultTheme;
  let config = defaultAppConfig;
  let engineConfig = defaultEngineConfig;

  /*istanbul ignore next */
  try {
    theme = require("theme.config.json");
  } catch (e) {
    process.env.NODE_ENV === "development" &&
      console.log("theme.config file not found, using default theme");
    theme = defaultTheme;
  }

  import("@cianciarusocataldo/modular-engine").then(
    ({ initStore, initi18n }) => {
      /*istanbul ignore next */
      try {
        engineConfig = require("engine.config").default;
      } catch (e) {
        process.env.NODE_ENV === "development" &&
          console.log(
            "engine.config file not found, using default engine config"
          );
        engineConfig = defaultEngineConfig;
      }

      initi18n(engineConfig);

      const { store, history } = initStore({
        config: engineConfig,
      });

      import("./components/MainApp").then(({ default: MainApp }) => {
        /*istanbul ignore next */
        try {
          config = require("app.config").default;
        } catch (e) {
          process.env.NODE_ENV === "development" &&
            console.log("app.config file not found, using default app config");
          config = defaultAppConfig;
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
    }
  );
};
