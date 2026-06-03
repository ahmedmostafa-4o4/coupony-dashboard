import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getCategoriesDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type CategoriesDictionary = typeof en;
