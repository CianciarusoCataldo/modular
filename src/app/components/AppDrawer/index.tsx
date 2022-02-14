import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  closeDrawer,
  driveWithDarkMode,
  isDrawerOpen,
} from "@cianciarusocataldo/modular-engine";

import { Drawer } from "@cianciarusocataldo/modular-ui";
import { ThemeField } from "../../types";

const AppDrawer = ({
  logo,
  children,
  theme,
}: {
  logo?: JSX.Element;
  theme: ThemeField;
  children?: JSX.Element;
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
    >
      {children}
    </DrawerComponent>
  );
};

export default AppDrawer;
