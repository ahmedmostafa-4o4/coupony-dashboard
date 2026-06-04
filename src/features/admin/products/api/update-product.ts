import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { hasFiles, objectToFormData } from "@/lib/utils/form-data";

import type { AdminUpdateProductResponseDto } from "../types/products.dto";
import type { UpdateProductRequest } from "../types/product.types";

export async function updateProduct(
  productId: string,
  payload: UpdateProductRequest
) {
  if (hasFiles(payload)) {
    // Laravel requires POST with _method=PATCH to handle multipart/form-data
    const formData = objectToFormData({ ...payload, _method: "PATCH" });
    return apiClient.post<AdminUpdateProductResponseDto, FormData>(
      apiEndpoints.admin.products.update(productId),
      formData
    );
  }

  return apiClient.patch<AdminUpdateProductResponseDto, UpdateProductRequest>(
    apiEndpoints.admin.products.update(productId),
    payload
  );
}
