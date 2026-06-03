import en from "../messages/en.json";
import ar from "../messages/ar.json";

export function getDashboardDictionary(lang: string) {
  return lang === "ar" ? ar : en;
}

export type DashboardDictionary = typeof en;
