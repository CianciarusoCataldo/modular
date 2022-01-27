const engineConfig = {
  appName: "Modular-app",
  redux: {
    modal: true,
    ui: true,
    epics: [],
    reducers: {},
    preload: {},
  },
  router: {
    basename: "/modular-app",
    homePage: "/",
    pages: {},
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: ["en", "it", "es", "fr", "de"],
    namespaces: ["home"],
    defaultNamespace: "home",
    loadPath: "/modular-app/locales/{{lng}}/{{ns}}.json",
  },
};

export default engineConfig;
