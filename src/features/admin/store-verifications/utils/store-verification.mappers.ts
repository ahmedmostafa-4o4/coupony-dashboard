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

export function cleanUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  
  // The backend might incorrectly prepend the storage path to an absolute URL
  // e.g., http://coupony-backend.test/storage/https://placehold.co/320x320/png?text=Pending+Baza
  const match = url.match(/\/storage\/(https?:\/\/.+)/);
  if (match && match[1]) {
    return match[1];
  }
  
  return url;
}

export function mapStoreVerificationDetails(
  data: Camelized<AdminStoreVerificationDetailsResponseDto["data"]>
): StoreVerification {
  const store = data.store ? {
    ...data.store,
    logoUrl: cleanUrl(data.store.logoUrl) ?? null,
    bannerUrl: cleanUrl(data.store.bannerUrl) ?? null,
  } : undefined;

  return {
    ...mapStoreVerification(data),
    store,
  };
}
