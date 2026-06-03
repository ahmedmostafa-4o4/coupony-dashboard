import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateProductResponseDto } from "../types/products.dto";
import type { UpdateProductRequest } from "../types/product.types";

export async function updateProduct(
  productId: string,
  payload: UpdateProductRequest
) {
  return apiClient.patch<AdminUpdateProductResponseDto, UpdateProductRequest>(
    apiEndpoints.admin.products.update(productId),
    payload
  );
}
