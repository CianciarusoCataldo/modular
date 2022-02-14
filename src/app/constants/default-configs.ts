import { Theme } from "../types";

export const defaultTheme: Theme = {
  body: {
    dark: "linear-gradient(to right, #3c4a5f, #4d5f7d)",
    default: "linear-gradient(to right, #eaebec, #cccdcf)",
  },
  header: {
    style: {
      height: "20%",
      borderBottom: "2px solid #c0c0c0",
    },
  },
  footer: {
    style: {
      height: "10%",
      borderTop: "2px solid #c0c0c0",
    },
  },
  router: {
    style: { height: "70%" },
  },
  drawer: {
    style: {
      borderRight: "2px solid #c0c0c0",
    },
  },
};

export const defaultEngineConfig = {
  redux: { ui: true, modal: true, epics: [], reducers: {}, preload: {} },
};

export const defaultAppConfig = {};
