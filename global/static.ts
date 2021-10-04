export const LanguageInfo = {
 title: {
  ko: "동영상 썸네일 제조기",
  en: "video thumbnail maker",
  ja: "ビデオサムネイルメーカー",
  chi: "视频缩略图制作器",
 },
};

export const langInfo = LanguageInfo;
//html edit 기능에 의존하지말고  style 오브젝트를 넣으면 안될까?
//style Object를 저장할 공간에 대해서 생각해 보아야할듯
//외국어 오브젝트를 저장할 공간이 필요할듯
//사이트 메뉴를 추가하고 삭제할때 어떻게해야할지 생각해야할듯

export const staticInfo =
 (lang: "ko" | "en" | "ja" | "chi") => (key: keyof typeof LanguageInfo) => {
  if (!LanguageInfo[key]) return "";
  return LanguageInfo[key][lang];
 };

export default LanguageInfo;
