import LeftArrow from "./icons/commons/left-arrow.svg";
import Burger from "./icons/commons/burger.svg";
import Logo from "./icons/commons/logo.png";

import DarkMode from "./icons/commons/dark-mode.svg";
import LightMode from "./icons/commons/light-mode.svg";

import IT_FLAG from "./icons/langs/it.svg";
import FR_FLAG from "./icons/langs/fr.svg";
import EN_FLAG from "./icons/langs/en.svg";
import DE_FLAG from "./icons/langs/de.svg";
import ES_FLAG from "./icons/langs/es.svg";

/** App logo */
export const LogoIcon = <img alt="" src={Logo} width={100} height={100} />;

export const LeftArrowIcon = <img alt="" src={LeftArrow} />;

export const BurgerIcon = <img alt="" src={Burger} width={60} />;

export const DarkModeIcon = <img alt="" src={DarkMode} width={30} />;

export const LightModeIcon = <img alt="" src={LightMode} width={30} />;

export const LANGUAGES_ICONS: Record<string, JSX.Element> = {
  it: <img alt="" width={20} height={20} src={IT_FLAG} />,
  de: <img alt="" width={20} height={20} src={DE_FLAG} />,
  fr: <img alt="" width={20} height={20} src={FR_FLAG} />,
  es: <img alt="" width={20} height={20} src={ES_FLAG} />,
  en: <img alt="" width={20} height={20} src={EN_FLAG} />,
};
