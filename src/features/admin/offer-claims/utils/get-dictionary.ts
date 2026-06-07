import ar from "../messages/ar.json";
import en from "../messages/en.json";

export type OfferClaimsDictionary = typeof en;

const dictionaries = {
  en,
  ar,
} as const;

export function getOfferClaimsDictionary(lang: string): OfferClaimsDictionary {
  return dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;
}
