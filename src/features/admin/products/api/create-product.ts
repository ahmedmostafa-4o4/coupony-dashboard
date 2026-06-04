import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { hasFiles, objectToFormData } from "@/lib/utils/form-data";

import type { AdminCreateProductResponseDto } from "../types/products.dto";
import type { CreateProductRequest } from "../types/product.types";

export async function createProduct(payload: CreateProductRequest) {
  if (hasFiles(payload)) {
    const formData = objectToFormData(payload);
    return apiClient.post<AdminCreateProductResponseDto, FormData>(
      apiEndpoints.admin.products.create,
      formData
    );
  }

  return apiClient.post<AdminCreateProductResponseDto, CreateProductRequest>(
    apiEndpoints.admin.products.create,
    payload
  );
}
