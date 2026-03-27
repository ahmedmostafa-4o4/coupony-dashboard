import type { Camelized } from "@/types";

import type {
  AdminStoreVerificationDetailsResponseDto,
  StoreVerificationDto,
} from "../types/store-verifications.dto";
import type { StoreVerification } from "../types/store-verification.types";

export function mapStoreVerification(
  item: Camelized<StoreVerificationDto>
): StoreVerification {
  return {
    ...item,
  };
}

export function mapStoreVerificationDetails(
  data: Camelized<AdminStoreVerificationDetailsResponseDto["data"]>
): StoreVerification {
  return {
    ...mapStoreVerification(data.storeVerification),
    store: data.store,
  };
}
