import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getStoresDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type StoresDictionary = typeof en;
