import React from "react";
import { LanguageInfo } from "../global/static";

export interface IAppContext {
 s: (key: keyof typeof LanguageInfo) => string;
}
const DEFAULT_APP_CONTEXT: IAppContext = {
 s: () => "",
};
export const AppContext = React.createContext<IAppContext>(DEFAULT_APP_CONTEXT);
