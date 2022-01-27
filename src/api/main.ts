export const initApplication = () => {
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

  let theme = defaultTheme;

  try {
    theme = require("theme.config.json");
  } catch (e) {
    process.env.NODE_ENV === "development" &&
      console.log("Theme file not found, using default theme.");
    theme = defaultTheme;
  }

  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  var css = `body { background-color : ${theme.body.initialColor} } body.dark { background-image: ${theme.body.darkColor}; } body.light { background-image: ${theme.body.lightColor}; }`;

  style.appendChild(document.createTextNode(css));

  head.appendChild(style);

  import("@cianciarusocataldo/modular-engine").then(
    ({ initi18n, initStore }) => {
      let engineConfig = { redux: { epics: [], reducers: {}, preload: {} } };
      let epics: any[] = [];
      let reducers = {};
      let preload = {};
      try {
        engineConfig = require("engine.config").default;
        epics = engineConfig.redux ? engineConfig.redux.epics || [] : [];
      } catch {
        process.env.NODE_ENV === "development" &&
          console.log("engine.config file not found, using default values");
        engineConfig = { redux: { epics: [], reducers: {}, preload: {} } };
        epics = [];
        reducers = {};
        preload = {};
      }
      initi18n(engineConfig);

      const { store, history } = initStore({
        CONFIG: engineConfig,
        reducers,
        epics,
        initialState: preload,
      });
      import("./core/init").then(({ default: initApp }) => {
        let config = {};

        try {
          config = require("app.config").default;
        } catch {
          config = {};
        }

        initApp({
          store,
          history,
          config,
          engine: engineConfig.redux,
          theme,
        });
      });
    }
  );
};
