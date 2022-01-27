/* eslint-disable *//* eslint-disable */
import 'react-toastify/dist/ReactToastify.css';
import { render } from 'react-dom';
import React, { useCallback, Suspense } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { driveWithDarkMode, isDrawerOpen, closeDrawer, closeModal, getModalType, isModalVisible, geti18nConfig, getPages, getHomePage, isInDarkMode, setDarkMode, getLanguage, changeLanguage } from '@cianciarusocataldo/modular-engine';
import { Container, Drawer, Modal, Toggle, Dropdown } from '@cianciarusocataldo/modular-ui';
import { useTranslation } from 'react-i18next';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var AppContainer = function (props) {
    var Component = driveWithDarkMode(Container);
    return React.createElement(Component, __assign({}, props));
};

/** Custom Modular-app drawer */
var AppDrawer = function (_a) {
    var logo = _a.logo, children = _a.children, elements = _a.elements;
    var dispatch = useDispatch();
    var isDrawerShowing = useSelector(isDrawerOpen);
    React.useEffect(function () {
        if (isDrawerShowing) {
            var element_1 = document.getElementById("modular-drawer");
            document.getElementById("app-container").onclick = function (e) {
                if (element_1 && !element_1.contains(e.target)) {
                    dispatch(closeDrawer());
                }
            };
        }
        else {
            document.getElementById("app-container").onclick = null;
        }
    }, [dispatch, isDrawerShowing]);
    var DrawerComponent = driveWithDarkMode(Drawer);
    return (React.createElement(DrawerComponent, { logo: logo, hide: !isDrawerShowing, onClose: function () {
            dispatch(closeDrawer());
        }, elements: elements }, children));
};

/** Custom Modular-app modal */
var AppModal = function (_a) {
    var modals = _a.modals;
    var dispatch = useDispatch();
    var onClose = useCallback(function () {
        dispatch(closeModal());
    }, [dispatch]);
    var type = useSelector(getModalType);
    var isVisible = useSelector(isModalVisible);
    var i18n = useSelector(geti18nConfig);
    var ModalContent = type && modals[type] ? modals[type] : React.createElement("div", null);
    var t = useTranslation(i18n.modalsNamespace).t;
    var ModalComponent = driveWithDarkMode(Modal);
    return (React.createElement(ModalComponent, { onClose: onClose, title: type ? t(type) : "", hide: !isVisible }, ModalContent));
};

var AppRouter = function (_a) {
    var history = _a.history, renderCallback = _a.renderCallback, style = _a.style;
    var PAGES = useSelector(getPages);
    var HOME = useSelector(getHomePage);
    var ALL_PAGES = __assign(__assign({}, PAGES), { HOME_PAGE: HOME });
    return (React.createElement(AppContainer, { unstyled: true, style: style },
        React.createElement(Router, { history: history },
            React.createElement(Switch, null,
                Object.keys(ALL_PAGES).map(function (route) {
                    return (React.createElement(Route, { component: renderCallback(route), key: route, exact: true, path: PAGES[route] }));
                }),
                React.createElement(Redirect, { to: HOME })))));
};

var DarkModeIcon = (React.createElement("svg", { viewBox: "0 0 496.158 496.158", width: "30px", height: "30px" },
    React.createElement("path", { d: "M248.082.003C111.07.003 0 111.063 0 248.085c0 137.001 111.07 248.07 248.082 248.07 137.006 0 248.076-111.069 248.076-248.07C496.158 111.062 385.088.003 248.082.003z", fill: "#334d5c" }),
    React.createElement("path", { d: "M322.377 80.781c10.1 22.706 15.721 47.844 15.721 74.298 0 101.079-81.94 183.019-183.019 183.019-26.454 0-51.591-5.622-74.298-15.721 28.49 64.053 92.674 108.721 167.298 108.721 101.078 0 183.019-81.94 183.019-183.019 0-74.625-44.668-138.809-108.721-167.298z", fill: "#f2c900" }),
    React.createElement("path", { d: "M155.079 338.098c-26.454 0-51.591-5.622-74.298-15.721 28.49 64.053 92.674 108.721 167.298 108.721 101.078 0 183.019-81.94 183.019-183.019 0 0-174.941 90.019-276.019 90.019zm81.555-149.427l-26.942-.95-8.464-24.773-8.463 24.773-26.942.95 21.71 15.149-8.186 26.473 21.881-16.523 21.881 16.523-8.185-26.473z", fill: "#dbbb00" }),
    React.createElement("path", { fill: "#f2c900", d: "M209.824 194.758l4.641-17.608-14.666 10.791-15.918-9.834 6.338 17.264-14.88 12.119 18.984-.712 6.321 17.915 5.797-18.294 18.385-.458z" }),
    React.createElement("path", { fill: "#dbbb00", d: "M101.521 229.699l-19.387-.684-6.091-17.828-6.091 17.828-19.388.684L66.187 240.6l-5.891 19.051 15.747-11.89 15.746 11.89-5.891-19.051z" }),
    React.createElement("path", { fill: "#f2c900", d: "M82.228 234.079l3.34-12.671-10.554 7.766-11.456-7.078 4.562 12.424-10.708 8.721 13.662-.512 4.549 12.892 4.172-13.165 13.229-.329z" }),
    React.createElement("path", { fill: "#dbbb00", d: "M278.639 68.596l-23.271-.821-7.31-21.398-7.311 21.398-23.271.821 18.752 13.086-7.072 22.866 18.902-14.272 18.9 14.272-7.071-22.866z" }),
    React.createElement("path", { fill: "#f2c900", d: "M255.482 73.853l4.009-15.209-12.669 9.322-13.75-8.495 5.477 14.911-12.855 10.468 16.399-.614 5.461 15.474 5.007-15.801 15.879-.396z" })));
var LightModeIcon = (React.createElement("svg", { viewBox: "0 0 187.322 187.322", width: "30px", height: "30px" },
    React.createElement("path", { fill: "#f7a663", d: "M101.677 40.71L93.661 0l-8.016 40.71h8.016z" }),
    React.createElement("path", { fill: "#ffc80a", d: "M67.185 47.804l6.942-4.008L46.83 12.548l13.413 39.264z" }),
    React.createElement("path", { fill: "#f7a663", d: "M47.804 67.186l4.007-6.943L12.548 46.83l31.247 27.298z" }),
    React.createElement("path", { fill: "#ffc80a", d: "M40.709 93.66l.001-8.014L0 93.66l40.709 8.017z" }),
    React.createElement("path", { fill: "#f7a663", d: "M47.803 120.137l-4.007-6.943-31.248 27.297 39.262-13.412z" }),
    React.createElement("path", { fill: "#ffc80a", d: "M60.244 135.511L46.83 174.774l27.297-31.247-6.943-4.008z" }),
    React.createElement("path", { fill: "#f7a663", d: "M85.645 146.611l8.016 40.711 8.016-40.709h-8.016z" }),
    React.createElement("path", { fill: "#ffc80a", d: "M120.137 139.519l-6.942 4.006 27.296 31.249-13.412-39.263z" }),
    React.createElement("path", { fill: "#f7a663", d: "M139.519 120.137l-4.009 6.94 39.263 13.414-31.248-27.297z" }),
    React.createElement("path", { fill: "#ffc80a", d: "M187.322 93.66l-40.71-8.015.001 8.015-.001 8.016z" }),
    React.createElement("path", { fill: "#f7a663", d: "M139.518 67.184l4.007 6.942 31.248-27.296-39.264 13.413z" }),
    React.createElement("path", { fill: "#ffc80a", d: "M127.078 51.812l13.413-39.264-27.298 31.248 6.943 4.008z" }),
    React.createElement("path", { d: "M93.661 45.265v96.793c26.729 0 48.397-21.668 48.397-48.397S120.39 45.265 93.661 45.265z", fill: "#fdd633" }),
    React.createElement("path", { d: "M45.265 93.661c0 26.729 21.668 48.397 48.396 48.397V45.265c-26.728 0-48.396 21.668-48.396 48.396z", fill: "#f4ca19" })));
var DarkModeSwitcher = function () {
    var dispatch = useDispatch();
    var dark = useSelector(isInDarkMode);
    var darkModeSwitch = useCallback(function () {
        dispatch(setDarkMode(!dark));
    }, [dispatch, dark]);
    return (React.createElement(Toggle, { onIcon: LightModeIcon, offIcon: DarkModeIcon, shadow: true, dark: dark, value: !dark, onChange: darkModeSwitch, className: "mx-1" }));
};

var LANGUAGE_ICONS = {
    it: (React.createElement("svg", { viewBox: "0 0 512 512", width: "20px", height: "20px" },
        React.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#f0f0f0" }),
        React.createElement("path", { fill: "#d80027", d: "M512 256c0-110.071-69.472-203.906-166.957-240.077v480.155C442.528 459.906 512 366.071 512 256z" }),
        React.createElement("path", { fill: "#6da544", d: "M0 256c0 110.071 69.472 203.906 166.957 240.077V15.923C69.472 52.094 0 145.929 0 256z" }))),
    es: (React.createElement("svg", { viewBox: "0 0 512 512", width: "20px", height: "20px" },
        React.createElement("path", { fill: "#ffda44", d: "M0 256c0 31.314 5.633 61.31 15.923 89.043L256 367.304l240.077-22.261C506.367 317.31 512 287.314 512 256s-5.633-61.31-15.923-89.043L256 144.696 15.923 166.957C5.633 194.69 0 224.686 0 256z" }),
        React.createElement("path", { d: "M496.077 166.957C459.906 69.473 366.071 0 256 0S52.094 69.473 15.923 166.957h480.154zM15.923 345.043C52.094 442.527 145.929 512 256 512s203.906-69.473 240.077-166.957H15.923z", fill: "#d80027" }))),
    fr: (React.createElement("svg", { viewBox: "0 0 512 512", width: "20px", height: "20px" },
        React.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#f0f0f0" }),
        React.createElement("path", { fill: "#d80027", d: "M512 256c0-110.071-69.472-203.906-166.957-240.077v480.155C442.528 459.906 512 366.071 512 256z" }),
        React.createElement("path", { fill: "#0052b4", d: "M0 256c0 110.071 69.473 203.906 166.957 240.077V15.923C69.473 52.094 0 145.929 0 256z" }))),
    en: (React.createElement("svg", { viewBox: "0 0 512 512", width: "20px", height: "20px" },
        React.createElement("circle", { cx: 256, cy: 256, r: 256, fill: "#f0f0f0" }),
        React.createElement("path", { d: "M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zm450.261 89.077c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zm89.075-450.26c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zm133.566 494.362c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zm47.222-180.397l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z", fill: "#0052b4" }),
        React.createElement("g", { fill: "#d80027" },
            React.createElement("path", { d: "M509.833 222.609H289.392V2.167A258.556 258.556 0 00256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 000 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0066.783 0V289.392h220.442A258.533 258.533 0 00512 256c0-11.317-.744-22.461-2.167-33.391z" }),
            React.createElement("path", { d: "M322.783 322.784L437.019 437.02a256.636 256.636 0 0015.048-16.435l-97.802-97.802h-31.482v.001zm-133.566 0h-.002L74.98 437.019a256.636 256.636 0 0016.435 15.048l97.802-97.804v-31.479zm0-133.565v-.002L74.981 74.98a256.636 256.636 0 00-15.048 16.435l97.803 97.803h31.481zm133.566 0L437.02 74.981a256.328 256.328 0 00-16.435-15.047l-97.802 97.803v31.482z" })))),
    de: (React.createElement("svg", { viewBox: "0 0 195.79 200", width: "20px", height: "20px" },
        React.createElement("path", { d: "M97.89 6.19h.01zM9.43 131.27h176.93H9.43z", fill: "#ed1c24" }),
        React.createElement("path", { fill: "#f6d926", d: "M97.89 193.81c40.84 0 75.58-26.11 88.46-62.54H9.43c12.88 36.43 47.62 62.54 88.46 62.54z" }),
        React.createElement("path", { fill: "#e02127", d: "M186.36 68.73H9.43C5.97 78.51 4.09 89.03 4.09 100s1.89 21.49 5.35 31.27h176.93c3.46-9.78 5.35-20.3 5.35-31.27s-1.91-21.49-5.36-31.27z" }),
        React.createElement("path", { fill: "#010101", d: "M9.43 68.73h176.93C173.48 32.3 138.74 6.19 97.9 6.19h-.01c-40.84 0-75.58 26.11-88.46 62.54z" }))),
};
/** Custom Modular-app laguage selector */
var LanguageSelector = function () {
    var dispatch = useDispatch();
    var language = useSelector(getLanguage);
    var LANGUAGES = Object.keys(LANGUAGE_ICONS);
    return (React.createElement(Dropdown, { dark: false, value: LANGUAGES.findIndex(function (lang) { return lang === language; }), shadow: true, onChange: function (lang) {
            dispatch(changeLanguage(LANGUAGES[lang]));
        }, content: Object.keys(LANGUAGE_ICONS).map(function (lang) { return ({
            name: lang,
            icon: LANGUAGE_ICONS[lang],
        }); }) }));
};

/** Render Modular-app */
var initApp = function (_a) {
    var _b, _c;
    var store = _a.store, history = _a.history, config = _a.config, engine = _a.engine, theme = _a.theme;
    engine.ui &&
        config.darkMode !== undefined &&
        store.dispatch(setDarkMode(config.darkMode));
    var CustomContent = config.content || (function () { return React.createElement("div", null); });
    var HeaderContent = config.header || (function () { return React.createElement("div", null); });
    var FooterContent = config.footer || (function () { return React.createElement("div", null); });
    var DrawerContent = (_b = config.drawer) === null || _b === void 0 ? void 0 : _b.content;
    var DrawerLogo = (_c = config.drawer) === null || _c === void 0 ? void 0 : _c.logo;
    render(React.createElement(Suspense, { fallback: React.createElement("div", { className: "preloader" }) },
        React.createElement(ToastContainer, null),
        React.createElement(Provider, { store: store },
            engine.modal && React.createElement(AppModal, { modals: config.modals || {} }),
            engine.ui && config.drawer && (React.createElement(AppDrawer, { logo: DrawerLogo && React.createElement(DrawerLogo, null), elements: config.drawer.elements && config.drawer.elements }, DrawerContent && React.createElement(DrawerContent, null))),
            React.createElement("div", { id: "app-container", style: {
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                } },
                config.header && (React.createElement(AppContainer, { wrapper: "header", className: theme.header.className, style: {
                        width: "100%",
                        overflow: "hidden",
                        height: theme.header.height,
                    } },
                    React.createElement("div", { style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        } },
                        React.createElement("div", { style: { display: "flex", flexDirection: "row" } },
                            React.createElement(LanguageSelector, null),
                            engine.ui && React.createElement(DarkModeSwitcher, null))),
                    React.createElement(HeaderContent, null))),
                config.pagesRendering && (React.createElement(AppRouter, { renderCallback: config.pagesRendering, history: history, className: theme.router.className, style: {
                        height: theme.router.height,
                        width: "100%",
                        overflow: "auto",
                    } })),
                React.createElement(CustomContent, null),
                config.footer && (React.createElement(AppContainer, { wrapper: "footer", className: theme.router.className, style: {
                        bottom: "0px",
                        position: "absolute",
                        overflow: "hidden",
                        width: "100%",
                        height: theme.footer.height,
                    } },
                    React.createElement(FooterContent, null)))))), document.getElementById("root"));
    var Preloader = document.getElementById("preloader");
    if (Preloader)
        Preloader.style.visibility = "hidden";
};

export { initApp as default };
