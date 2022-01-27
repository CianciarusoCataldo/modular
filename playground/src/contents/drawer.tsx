import classNames from "classnames";
import { LogoIcon } from "assets/images";

import {
  closeDrawer,
  driveWithDarkMode,
  getAppName,
  getHomePage,
  geti18nConfig,
  getPages,
  isInDarkMode,
  requestRoute,
} from "@cianciarusocataldo/modular-engine";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  Button,
  Divider,
  DrawerElement,
  Link,
} from "@cianciarusocataldo/modular-ui";

export const DrawerLogo = () => {
  const APP_NAME = useSelector(getAppName);
  const LinkComponent = driveWithDarkMode(Link);

  return (
    <div className="flex flex-row">
      {LogoIcon}
      <LinkComponent
        to="https://github.com/CianciarusoCataldo/modular-app"
        className="ml-1 text-lg break-all"
        newTab
      >
        {APP_NAME}
      </LinkComponent>
    </div>
  );
};

export const DrawerContent = () => {
  const dispatch = useDispatch();
  const PATHS = useSelector(getPages);
  const i18n = useSelector(geti18nConfig);
  const HOME = useSelector(getHomePage);
  const dark = useSelector(isInDarkMode);
  const { t } = useTranslation(i18n.pagesNamespace);

  const ALL_PATHS: Record<string, string> = { ...PATHS, HOME_PAGE: HOME };

  return (
    <div>
      {Object.keys(ALL_PATHS)
        .sort()
        .map((route, index) => {
          return (
            <div className="mt-1 mb-3" key={`drawer_app_element_${index}`}>
              <Button
                unstyled
                onClick={() => {
                  dispatch(requestRoute(ALL_PATHS[route]));
                  dispatch(closeDrawer());
                }}
                className={classNames(
                  {
                    "text-white": dark,
                    "text-gray-600": !dark,
                  },
                  "hover:text-orange-500 text-xl"
                )}
              >
                {t(route)}
              </Button>
              <Divider dark={dark} />
            </div>
          );
        })}
    </div>
  );
};

export const DrawerElements: DrawerElement = [];
