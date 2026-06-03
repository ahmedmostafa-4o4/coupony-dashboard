import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteProductResponseDto } from "../types/products.dto";

export async function deleteProduct(productId: string) {
  return apiClient.delete<AdminDeleteProductResponseDto>(
    apiEndpoints.admin.products.delete(productId)
  );
}
