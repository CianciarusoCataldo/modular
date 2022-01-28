import App from "app/App";
import { DrawerContent, DrawerLogo } from "contents/drawer";
import FooterContent from "contents/footer";
import HeaderContent from "contents/header";
import { lazy } from "react";

const appConfig = {
  pagesRendering: (route) => lazy(() => import(`app/pages/${route}`)),
  content: App,
  modals: {},
  darkMode: true,
  preloader: () => <div className="preloader" />,
  header: HeaderContent,
  footer: FooterContent,
  drawer: {
    content: DrawerContent,
    logo: DrawerLogo,
    elements: [],
  },
};

export default appConfig;
