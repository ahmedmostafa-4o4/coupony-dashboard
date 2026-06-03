import en from "./en.json";
import ar from "./ar.json";

export function getGlobalDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type GlobalDictionary = typeof en;
