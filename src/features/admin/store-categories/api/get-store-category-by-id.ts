import { getStoreCategories } from "./get-store-categories";

import { adaptStoreCategoryDetailsFallback } from "../utils/store-category-details.adapter";

export async function getStoreCategoryById(storeCategoryId: string) {
  const response = await getStoreCategories();

  return adaptStoreCategoryDetailsFallback(storeCategoryId, response);
}
