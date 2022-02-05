import React from "react";
import { driveWithDarkMode } from "@cianciarusocataldo/modular-engine";

import { Container, ContainerProps } from "@cianciarusocataldo/modular-ui";

/* istanbul ignore next */
const AppContainer = (props: Omit<ContainerProps, "dark">) => {
  const Component = driveWithDarkMode(Container);
  return <Component {...props} />;
};

export default AppContainer;
