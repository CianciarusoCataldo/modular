import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppConfig, ThemeField } from "../../types";

import {
  closeDrawer,
  driveWithDarkMode,
  isDrawerOpen,
} from "@cianciarusocataldo/modular-engine";

import { Drawer } from "@cianciarusocataldo/modular-ui";

const AppDrawer = ({
  logo,
  children,
  theme,
  position,
}: {
  logo?: () => JSX.Element;
  theme: ThemeField;
  children?: JSX.Element;
  position?: AppConfig["drawer"]["position"];
}) => {
  const dispatch = useDispatch();
  const isDrawerShowing = useSelector(isDrawerOpen);

  /* istanbul ignore next */
  React.useEffect(() => {
    if (isDrawerShowing) {
      let element = document.getElementById("modular-drawer");
      let app = document.getElementById("app-container");
      if (app) {
        app.onclick = function (e: Event) {
          if (element && !element.contains(e.target as Node)) {
            dispatch(closeDrawer());
          }
        };
      }
    }
    return () => {
      let app = document.getElementById("app-container");

      if (app) {
        app.onclick = null;
      }
    };
  }, [dispatch, isDrawerShowing]);

  const DrawerComponent = driveWithDarkMode(Drawer);

  return (
    <DrawerComponent
      className={theme.className}
      logo={logo}
      hide={!isDrawerShowing}
      onClose={() => {
        dispatch(closeDrawer());
      }}
      style={theme.style}
      position={position}
    >
      {children}
    </DrawerComponent>
  );
};

export default AppDrawer;
