/// <reference types="react" />
/** Custom Modular-app modal */
declare const AppModal: ({ modals, }: {
    modals: Record<string, () => JSX.Element>;
}) => JSX.Element;
export default AppModal;
