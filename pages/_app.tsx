import "../css/custom.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { staticInfo } from "../global/static";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { checkWorkingBrowser } from "../utils/validate/checkWorkingBrowser";
import { AppContext } from "../type/context";

function MyApp({ Component, pageProps }: AppProps) {
 const { locale } = useRouter();
 const s = staticInfo.bind(staticInfo, (locale as any) || "ko");

 useEffect(() => {
  const result = checkWorkingBrowser();
  if (!result) {
   alert(
    "해당 브라우저는 편집을 진행 하실 수 없습니다. 최신 버전의 Chrome 을 사용 권장부탁합니다."
   );
  }
 }, []);
 return (
  <AppContext.Provider
   value={{
    s: s as any,
   }}
  >
   <Component {...pageProps} />
  </AppContext.Provider>
 );
}
export default MyApp;
