import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapProductDetails } from "../utils/product.mappers";
import type { AdminProductDetailsResponseDto } from "../types/products.dto";

export async function getProductById(productId: string) {
  const response = await apiClient.get<AdminProductDetailsResponseDto>(
    apiEndpoints.admin.products.detail(productId)
  );

  return mapItemResponse(response, mapProductDetails);
}
