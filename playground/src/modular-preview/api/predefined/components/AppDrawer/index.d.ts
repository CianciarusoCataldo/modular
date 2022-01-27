/// <reference types="react" />
import { DrawerElement } from "@cianciarusocataldo/modular-ui";
/** Custom Modular-app drawer */
declare const AppDrawer: ({ logo, children, elements, }: {
    logo?: JSX.Element;
    children?: JSX.Element;
    elements?: DrawerElement[];
}) => JSX.Element;
export default AppDrawer;
