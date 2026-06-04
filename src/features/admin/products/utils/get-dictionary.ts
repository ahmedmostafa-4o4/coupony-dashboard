import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getProductsDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type ProductsDictionary = typeof en;
