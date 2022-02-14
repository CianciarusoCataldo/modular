import React, { CSSProperties } from "react";

import { ThemeField } from "../../types";

import { driveWithDarkMode } from "@cianciarusocataldo/modular-engine";

import { Container } from "@cianciarusocataldo/modular-ui";

const ThemedContainer = ({
  children,
  style: inputStyle,
  theme,
  wrapper: inputWrapper,
}: {
  children: JSX.Element;
  style?: CSSProperties;
  theme: ThemeField;
  wrapper?: "div" | "header" | "footer";
}) => {
  const AppContainer = driveWithDarkMode(Container);
  const style = theme.override || inputStyle;
  const themeStyle = theme.style || {};
  const wrapper = inputWrapper || "div";

  return (
    <AppContainer
      unstyled={Boolean(theme.className)}
      wrapper={wrapper}
      className={theme.className}
      style={{
        ...style,
        ...themeStyle,
      }}
    >
      {children}
    </AppContainer>
  );
};

export default ThemedContainer;
