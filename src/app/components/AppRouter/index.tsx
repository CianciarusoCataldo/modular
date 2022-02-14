import React from "react";

import { History } from "history";

import { useSelector } from "react-redux";

import { getHomePage, getPages } from "@cianciarusocataldo/modular-engine";

import { Redirect, Route, RouteProps, Router, Switch } from "react-router-dom";
import { ThemeField } from "../../types";

const AppRouter = ({
  history,
  renderCallback,
  theme,
}: {
  history: History;
  renderCallback: (route: string) => RouteProps["component"];
  theme?: ThemeField;
}) => {
  const PAGES = useSelector(getPages);
  const HOME = useSelector(getHomePage);
  const ALL_PAGES: Record<string, string> = {
    ...PAGES,
    HOME_PAGE: HOME,
  };
  const routerStyle = theme.override || theme.style;

  return (
    <div
      style={{ ...routerStyle, width: "100%", overflow: "auto" }}
      className={theme.className}
    >
      <Router history={history}>
        <Switch>
          {Object.keys(ALL_PAGES).map((route) => {
            return (
              <Route
                component={renderCallback(route)}
                key={route}
                exact
                path={PAGES[route]}
              />
            );
          })}
          <Redirect to={HOME} />
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
