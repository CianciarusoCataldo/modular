export const getClassname = (
  classForDesktop: string,
  classForMobile: string
) => `
"flex ${classForMobile} lg:${classForDesktop} xl:${classForDesktop} 2xl:${classForDesktop} 3xl:${classForDesktop} 4xl:${classForDesktop}`;

export const FLEX_STYLES = {
  COLS_ROWS: `flex ${getClassname("flex-col", "flex-row")}`,
  ROWS_COLS: `flex ${getClassname("flex-row", "flex-col")}`,
};
