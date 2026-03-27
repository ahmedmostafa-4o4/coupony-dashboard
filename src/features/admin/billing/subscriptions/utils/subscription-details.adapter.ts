import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type {
  Subscription,
  SubscriptionsListResult,
} from "../types/subscription.types";

export function adaptSubscriptionDetailsFallback(
  subscriptionId: string,
  collection: SubscriptionsListResult
) {
  // TODO: Replace this subscription fallback with a dedicated GET /admin/subscriptions/{subscriptionId} endpoint when available.
  return resolveItemFromCollectionFallback<Subscription>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: subscriptionId,
    raw: collection.raw,
  });
}
