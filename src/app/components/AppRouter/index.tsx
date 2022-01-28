import React from "react";

import { History } from "history";

import { useSelector } from "react-redux";

import { getHomePage, getPages } from "@cianciarusocataldo/modular-engine";

import { Redirect, Route, RouteProps, Router, Switch } from "react-router-dom";

import AppContainer from "../AppContainer";
import { CSSProperties } from "react";

const AppRouter = ({
  history,
  renderCallback,
  style,
}: {
  history: History;
  renderCallback: (route: string) => RouteProps["component"];
  style?: CSSProperties;
  className?: string;
}) => {
  const PAGES = useSelector(getPages);
  const HOME = useSelector(getHomePage);
  const ALL_PAGES: Record<string, string> = {
    ...PAGES,
    HOME_PAGE: HOME,
  };

  return (
    <AppContainer unstyled style={style}>
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
    </AppContainer>
  );
};

export default AppRouter;
