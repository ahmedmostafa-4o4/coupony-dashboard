import type { Camelized } from "@/types";

import type {
  AdminOfferDetailsResponseDto,
  OfferDto,
} from "../types/offers.dto";
import type { Offer } from "../types/offer.types";

export function mapOffer(item: Camelized<OfferDto>): Offer {
  return {
    ...item,
  };
}

export function mapOfferDetails(
  data: Camelized<AdminOfferDetailsResponseDto["data"]>
): Offer {
  return {
    ...mapOffer(data.offer),
    store: data.store ?? null,
  };
}
