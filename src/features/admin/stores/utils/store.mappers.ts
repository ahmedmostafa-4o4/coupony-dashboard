import type { Camelized } from "@/types";

import type {
  AdminStoreDetailsResponseDto,
  StoreDto,
} from "../types/stores.dto";
import type { Store } from "../types/store.types";

export function mapStore(item: Camelized<StoreDto>): Store {
  return {
    ...item,
    ownerName:
      typeof item.ownerUserId === "string"
        ? item.ownerUserId
        : item.ownerUserId
          ? String(item.ownerUserId)
          : undefined,
  };
}

export function mapStoreDetails(
  data: Camelized<AdminStoreDetailsResponseDto["data"]>
): Store {
  return {
    ...mapStore(data.store),
    billingProfile: data.billingProfile ?? null,
    followersCount: data.followersCount,
    owner: data.owner,
    verifications: data.verifications ?? [],
  };
}
