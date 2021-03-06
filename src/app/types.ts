import { RouteProps } from "react-router-dom";
import { Config } from "@cianciarusocataldo/modular-engine";
import { CSSProperties } from "react";
import { DrawerProps } from "@cianciarusocataldo/modular-ui";

export interface CustomizableProperties {
  background?: string;
  text?: string;
}

export interface ThemeField {
  className?: string;
  style?: CSSProperties;
  override?: CSSProperties;
}

/** App custom theme, to customize some part of final app UI */
export type Theme = {
  /** Header custom attributes */
  header: ThemeField;

  /** Footer custom attributes */
  footer: ThemeField;

  /** Router custom attributes */
  router: ThemeField;

  /** Drawer custom attributes */
  drawer: ThemeField;

  /** Body custom attributes */
  body?: {
    default: string;
    dark: string;
  };

  ui?: {
    default?: CustomizableProperties;
    dark?: CustomizableProperties;
  };
} & Record<string, any>;

/** Modular app config, to control app behaviour */
export type AppConfig = {
  /** Preloader element, displayed during loading (as fallback) */
  preloader?: () => JSX.Element;

  /** Error custom component, rendered when an error is catched by the App Error Boundary (if not set, the default error fallback will be used) */
  error?: () => JSX.Element;

  /** Custom route rendering function, to return the right component based on the given route (if not set, router won't be loaded) */
  pagesRendering?: (route: string) => RouteProps["component"];

  /** App drawer content (if not set, drawer won't be rendered) */
  drawer?: {
    /** App drawer custom content */
    content: () => JSX.Element;

    /** App Drawer custom logo, displayed at the top of the Drawer */
    logo: () => JSX.Element;

    /** App Drawer position (relative to the window) */
    position?: DrawerProps["position"];
  };

  /** Custom modals object. Keys are the modals types, values are component to render inside the modal, when opened */
  modals?: Record<string, () => JSX.Element>;

  /** Header custom component (if not set, header won't be rendered) */
  header?: () => JSX.Element;

  /** Footer custom component (if not set, footer won't be rendered) */
  footer?: () => JSX.Element;

  /** Custom component, rendered below the router, before the footer */
  content?: () => JSX.Element;

  /**  */
  useQueryParams?: boolean;
};

export type Init = (props: {
  appConfig?: AppConfig;
  engine?: Config;

  /** Callback called at the end of the init process */
  onComplete?: (App: JSX.Element) => any;

  /** Callback called before any init operation */
  onStart?: () => any;
  theme?: Theme;
}) => Promise<{ App: JSX.Element }>;
