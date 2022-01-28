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
  body: {
    darkColor: "",
    lightColor: "",
    initialColor: "",
  },
};

const defaultEngineConfig = {
  redux: { ui: true, modal: true, epics: [], reducers: {}, preload: {} },
};

const defaultAppConfig = { darkMode: false };

var theme = defaultTheme;
var engineConfig = defaultEngineConfig;

try {
  theme = require("theme.config.json");
} catch (e) {
  process.env.NODE_ENV === "development" &&
    console.log("Theme file not found, using default theme.");
  theme = defaultTheme;
}

try {
  engineConfig = require("engine.config").default;
} catch {
  process.env.NODE_ENV === "development" &&
    console.log("engine.config file not found, using default engine config");
  engineConfig = defaultEngineConfig;
}

export const initApplication = (callback: (App: JSX.Element) => any) => {
  let config = defaultAppConfig;

  if (theme.body) {
    let css = "";
    if (theme.body.initialColor) {
      css = css + ` body { background-color : ${theme.body.initialColor} }`;
    }
    if (theme.body.darkColor) {
      css = css + ` body.dark { background-image: ${theme.body.darkColor}; }`;
    }
    if (theme.body.lightColor) {
      css = css + ` body.light { background-image: ${theme.body.lightColor}; }`;
    }

    if (theme.body.darkColor || theme.body.darkColor || theme.body.lightColor) {
      let head = document.head || document.getElementsByTagName("head")[0];
      let style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }

  import("@cianciarusocataldo/modular-engine").then(({ initi18n }) => {
    initi18n(engineConfig);
  });

  import("@cianciarusocataldo/modular-engine").then(
    ({ initStore, setDarkMode }) => {
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
