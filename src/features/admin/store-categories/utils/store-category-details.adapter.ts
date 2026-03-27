import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type {
  StoreCategory,
  StoreCategoriesListResult,
} from "../types/store-category.types";

export function adaptStoreCategoryDetailsFallback(
  storeCategoryId: string,
  collection: StoreCategoriesListResult
) {
  // TODO: Replace this store category fallback with a dedicated GET /admin/store-categories/{storeCategoryId} endpoint when available.
  return resolveItemFromCollectionFallback<StoreCategory>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: storeCategoryId,
    raw: collection.raw,
  });
}
