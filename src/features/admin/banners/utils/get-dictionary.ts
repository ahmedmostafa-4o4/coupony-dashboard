

import ar from "../messages/ar.json";
import en from "../messages/en.json";

export type BannersDictionary = typeof en;

const dictionaries = {
  en,
  ar,
} as const;

export function getBannersDictionary(lang: string): BannersDictionary {
  return dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;
}
