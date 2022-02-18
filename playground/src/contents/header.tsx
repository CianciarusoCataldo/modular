import { useDispatch, useSelector } from "react-redux";

import {
  BurgerIcon,
  DarkModeIcon,
  DocsIcon,
  LANGUAGES_ICONS,
  LeftArrowIcon,
  LightModeIcon,
  LogoIcon,
} from "assets/images";

import { useCallback } from "react";
import { useCommonTranslation } from "hooks/localization";

import {
  changeLanguage,
  getAppName,
  getHomePage,
  getLanguage,
  isHomePage,
  isInDarkMode,
  openDrawer,
  requestRoute,
  setDarkMode,
} from "@cianciarusocataldo/modular-engine";

import { Button, Dropdown, Link, Toggle } from "@cianciarusocataldo/modular-ui";

const HeaderContent = () => {
  const dispatch = useDispatch();
  const APP_NAME = useSelector(getAppName);
  const hideHomeButton = useSelector(isHomePage);
  const HOME = useSelector(getHomePage);
  const dark = useSelector(isInDarkMode);
  const darkModeSwitch = useCallback(() => {
    dispatch(setDarkMode(!dark));
  }, [dispatch, dark]);
  const language = useSelector(getLanguage);
  const LANGUAGES = Object.keys(LANGUAGES_ICONS);

  const t = useCommonTranslation();

  return (
    <div className="flex flex-col">
      <div
        className="mb-2 flex flex-col"
        style={{
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="flex flex-row m-auto pr-4">
            <Link
              to="https://cianciarusocataldo.github.io/modular/docs"
              className="m-auto"
              newTab
            >
              {DocsIcon}
            </Link>
            <div className="m-auto hidden xsm:block">
              <Link
                dark={dark}
                to="https://cianciarusocataldo.github.io/modular/docs"
                newTab
              >
                {t("docs")}
              </Link>
            </div>
          </div>
          <Dropdown
            dark={false}
            value={LANGUAGES.findIndex((lang) => lang === language)}
            shadow
            onChange={(lang: number) => {
              dispatch(changeLanguage(LANGUAGES[lang]));
            }}
            content={Object.keys(LANGUAGES_ICONS).map((lang) => ({
              name: lang,
              icon: LANGUAGES_ICONS[lang],
            }))}
            className="h-12"
          />
          <Toggle
            onIcon={LightModeIcon}
            offIcon={DarkModeIcon}
            shadow
            dark={dark}
            value={!dark}
            onChange={darkModeSwitch}
            className="mx-1"
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="my-auto">
          <Button
            aria-label="drawer button"
            onClick={() => {
              dispatch(openDrawer());
            }}
            unstyled
            className="outline-none"
          >
            <div className="p-1 sm:p-2 md:p-2">{BurgerIcon}</div>
          </Button>
        </div>
        <div className="my-auto">
          <Button
            aria-label="back button"
            onClick={() => {
              dispatch(requestRoute(HOME));
            }}
            unstyled
            className="overflow-auto ml-1 outline-none"
            hide={hideHomeButton}
          >
            {LeftArrowIcon}
          </Button>
        </div>
        <div className="m-auto flex flex-row p-2">
          <div className="mr-2 my-auto"> {LogoIcon}</div>
          <div className="flex flex-col my-auto">
            <Link
              dark={dark}
              newTab
              to="https://github.com/CianciarusoCataldo/modular"
            >
              <p className="break-words text-lg sm:text-xl md:text-2xl lg:text-4xl">
                {APP_NAME}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
