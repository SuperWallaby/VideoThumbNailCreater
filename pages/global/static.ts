export const info = {};

export const langInfo = info;
//html edit 기능에 의존하지말고  style 오브젝트를 넣으면 안될까?
//style Object를 저장할 공간에 대해서 생각해 보아야할듯
//외국어 오브젝트를 저장할 공간이 필요할듯
//사이트 메뉴를 추가하고 삭제할때 어떻게해야할지 생각해야할듯

export const staticInfo =
 (lang: "ko" | "en" | "ja" | "chi") => (key: keyof typeof info) => {
  if (!info[key]) return "";
  return info[key][lang];
 };

export default info;
