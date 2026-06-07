import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getStoreVerificationsDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type StoreVerificationsDictionary = typeof en;
