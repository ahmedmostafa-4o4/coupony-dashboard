import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type {
  Commission,
  CommissionsListResult,
} from "../types/commission.types";

export function adaptCommissionDetailsFallback(
  commissionId: string,
  collection: CommissionsListResult
) {
  // TODO: Replace this commission fallback with a dedicated GET /admin/commissions/{commissionId} endpoint when available.
  return resolveItemFromCollectionFallback<Commission>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: commissionId,
    raw: collection.raw,
  });
}
