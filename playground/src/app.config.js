import App from "app/App";
import { DrawerContent, DrawerLogo } from "contents/drawer";
import FooterContent from "contents/footer";
import HeaderContent from "contents/header";
import React from "react";

const appConfig = {
  pagesRendering: (route) => React.lazy(() => import(`app/pages/${route}`)),
  content: App,
  modals: {},
  darkMode: true,
  header: HeaderContent,
  footer: FooterContent,
  drawer: {
    content: DrawerContent,
    logo: DrawerLogo,
    elements: [],
  },
};

export default appConfig;
