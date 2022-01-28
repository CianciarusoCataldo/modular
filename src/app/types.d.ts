import { RouteProps } from "react-router-dom";
import { DrawerElement } from "@cianciarusocataldo/modular-ui";

export interface ThemeField {
  height?: string;
  className?: string;
}

export type Theme = {
  header: ThemeField;
  footer: ThemeField;
  router: ThemeField;
} & Record<string, any>;

export type AppConfig = {
  preloader?: string;
  pagesRendering?: (route: string) => RouteProps["component"];
  darkMode?: boolean;
  drawer?: {
    content: () => JSX.Element;
    logo: () => JSX.Element;
    elements: DrawerElement[];
  };
  modals?: Record<string, () => JSX.Element>;
  header?: () => JSX.Element;
  footer?: () => JSX.Element;
  content?: () => JSX.Element;
};
