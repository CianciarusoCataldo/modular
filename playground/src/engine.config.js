const engineConfig = {
  appName: "Modular",
  redux: {
    modal: true,
    ui: true,
    reducers: {},
    preload: {},
    epics: [],
    darkMode: true,
    titles: true,
  },
  router: {
    basename: "/modular",
    homePage: "/",
    pages: {
      TestPage: "/test/page",
    },
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: ["en", "it", "es", "fr", "de"],
    loadPath: "/modular/locales/{{lng}}/{{ns}}.json",
    pagesNamespace: "page-titles",
    modalsNamespace: "modal-titles",
  },
};

export default engineConfig;
