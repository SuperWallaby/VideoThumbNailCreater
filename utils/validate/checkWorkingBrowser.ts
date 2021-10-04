export const checkWorkingBrowser = () => {
 if (!window.SharedArrayBuffer) return false;
 return true;
};
