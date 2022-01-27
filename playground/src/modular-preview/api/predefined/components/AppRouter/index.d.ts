import { History } from "history";
import { RouteProps } from "react-router-dom";
import { CSSProperties } from "react";
declare const AppRouter: ({ history, renderCallback, style, }: {
    history: History;
    renderCallback: (route: string) => RouteProps["component"];
    style?: CSSProperties;
    className?: string;
}) => JSX.Element;
export default AppRouter;
