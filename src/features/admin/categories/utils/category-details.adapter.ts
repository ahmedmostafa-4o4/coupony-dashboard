import { resolveItemFromCollectionFallback } from "@/features/admin/shared/utils/admin-fallback";

import type { Category, CategoriesListResult } from "../types/category.types";

export function adaptCategoryDetailsFallback(
  categoryId: string,
  collection: CategoriesListResult
) {
  // TODO: Replace this category fallback with a dedicated GET /admin/categories/{categoryId} endpoint when available.
  return resolveItemFromCollectionFallback<Category>({
    getItemId: (item) =>
      typeof item.id === "string" ? item.id : item.id ? String(item.id) : null,
    items: collection.items,
    requestedId: categoryId,
    raw: collection.raw,
  });
}
