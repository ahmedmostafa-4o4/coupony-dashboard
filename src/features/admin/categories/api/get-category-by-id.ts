import { getCategories } from "./get-categories";

import { adaptCategoryDetailsFallback } from "../utils/category-details.adapter";

export async function getCategoryById(categoryId: string) {
  const response = await getCategories();

  return adaptCategoryDetailsFallback(categoryId, response);
}
