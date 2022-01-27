import { useTranslation } from "react-i18next";

/** Return `home` namespace translation hook (used into `HOME_PAGE`) */
export const useHomePageTranslation = () => {
  const { t } = useTranslation("home");
  return t;
};
