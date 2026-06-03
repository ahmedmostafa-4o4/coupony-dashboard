import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getStoreCategoriesDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type StoreCategoriesDictionary = typeof en;
