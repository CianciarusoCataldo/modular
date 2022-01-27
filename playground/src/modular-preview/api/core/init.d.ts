/// <reference types="react" />
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "./types";
import { DrawerElement } from "@cianciarusocataldo/modular-ui";
import { RouteProps } from "react-router-dom";
import { History } from "history";
import { Store } from "@reduxjs/toolkit";
/** Render Modular-app */
declare const initApp: ({ store, history, config, engine, theme, }: {
    store: Store;
    history: History;
    engine: Record<any, any> & {
        ui?: boolean;
        modal?: boolean;
    };
    config: {
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
    theme: Theme;
}) => void;
export default initApp;
