export const getFileFromRef = (
 refObj: React.RefObject<HTMLInputElement>
): File | null => {
 if (
  refObj.current &&
  refObj.current.files &&
  refObj.current.files.length !== 0
 ) {
  return refObj.current.files[0];
 } else {
  return null;
 }
};
