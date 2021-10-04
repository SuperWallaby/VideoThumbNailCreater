export const getScale = (str: string) => {
 return parseInt(str);
};
export const getInterval = (str: string) => {
 return parseInt(str);
};
export const getSelect = (str: string) => {
 const _str = str;
 _str.replace("'lt(mod(t,", "");
 _str.replace("')", "");
 const [range, select] = _str.split(",");
 return { range, select };
};
