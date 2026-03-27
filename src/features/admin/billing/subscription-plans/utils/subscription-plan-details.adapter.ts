import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type {
  SubscriptionPlan,
  SubscriptionPlansListResult,
} from "../types/subscription-plan.types";

export function adaptSubscriptionPlanDetailsFallback(
  planId: string,
  collection: SubscriptionPlansListResult
) {
  // TODO: Replace this subscription plan fallback with a dedicated GET /admin/subscription-plans/{planId} endpoint when available.
  return resolveItemFromCollectionFallback<SubscriptionPlan>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: planId,
    raw: collection.raw,
  });
}
