import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateProductResponseDto } from "../types/products.dto";
import type { CreateProductRequest } from "../types/product.types";

export async function createProduct(payload: CreateProductRequest) {
  return apiClient.post<AdminCreateProductResponseDto, CreateProductRequest>(
    apiEndpoints.admin.products.create,
    payload
  );
}
