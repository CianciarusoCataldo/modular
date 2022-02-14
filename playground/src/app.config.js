import { lazy } from "react";

import App from "app/App";
import { DrawerContent, DrawerLogo } from "contents/drawer";
import FooterContent from "contents/footer";
import HeaderContent from "contents/header";

const appConfig = {
  pagesRendering: (route) => lazy(() => import(`pages/${route}`)),
  content: App,
  modals: {},
  preloader: () => <div className="preloader" />,
  header: HeaderContent,
  footer: FooterContent,
  useQueryParams: true,
  drawer: {
    content: DrawerContent,
    logo: DrawerLogo,
  },
};

export default appConfig;
