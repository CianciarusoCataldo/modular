const engineConfig = {
  appName: "Modular-app",
  redux: {
    modal: true,
    ui: true,
    reducers: {},
    preload: {},
    epics: [],
    darkMode: true,
  },
  router: {
    basename: "/modular-app",
    homePage: "/",
    pages: {},
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: ["en", "it", "es", "fr", "de"],
    loadPath: "/modular-app/locales/{{lng}}/{{ns}}.json",
    pagesNamespace: "page-titles",
    modalsNamespace: "modal-titles",
  },
};

export default engineConfig;
