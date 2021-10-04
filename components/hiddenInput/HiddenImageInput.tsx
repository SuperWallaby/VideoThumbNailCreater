import { forwardRef } from "react";
import { IInput } from "../../type/interface";

export interface IProps extends IInput {}
export const HiddenImageInput = forwardRef<HTMLInputElement, IProps>(
 (props, ref) => {
  return (
   <input
    style={{
     position: "absolute",
     opacity: 0,
     width: "1px",
     height: "1px",
    }}
    type="file"
    accept={"image/*"}
    ref={ref}
    {...props}
   />
  );
 }
);
HiddenImageInput.displayName = "hiddenInput";

export default HiddenImageInput;
