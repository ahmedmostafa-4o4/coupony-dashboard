import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

export function getTravelBannersDictionary(lang: string) {
  const dictionary = lang === "ar" ? ar : en;
  return dictionary.adminTravelBanners;
}

export type TravelBannersDictionary = ReturnType<typeof getTravelBannersDictionary>;
