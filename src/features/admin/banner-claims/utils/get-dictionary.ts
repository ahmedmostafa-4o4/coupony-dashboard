import ar from "../messages/ar.json";
import en from "../messages/en.json";

export type BannerClaimsDictionary = typeof en;

const dictionaries = {
  en,
  ar,
} as const;

export function getBannerClaimsDictionary(lang: string): BannerClaimsDictionary {
  return dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;
}
