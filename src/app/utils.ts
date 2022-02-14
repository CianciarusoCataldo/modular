import { ThemeField } from "./types";

/**
 * Utility function to add CSS in multiple passes.
 *
 * @param {string} styleString
 */
export const addStyle = (styleString: string) => {
  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
};

/*istanbul ignore next */
export const printDev = (output: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(output);
  }
};

export const parseThemeField = (
  themeField: Partial<ThemeField>,
  defaultThemeField: ThemeField
): ThemeField => {
  return {
    className: themeField.className,
    style: themeField.style || defaultThemeField.style,
  };
};
