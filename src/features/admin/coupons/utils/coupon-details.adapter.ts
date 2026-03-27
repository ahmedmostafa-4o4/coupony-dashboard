import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type { Coupon, CouponsListResult } from "../types/coupon.types";

export function adaptCouponDetailsFallback(
  couponId: string,
  collection: CouponsListResult
) {
  // TODO: Replace this coupon fallback with a dedicated GET /admin/coupons/{couponId} endpoint when available.
  return resolveItemFromCollectionFallback<Coupon>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: couponId,
    raw: collection.raw,
  });
}
