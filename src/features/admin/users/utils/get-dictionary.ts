import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getUsersDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type UsersDictionary = typeof en;
