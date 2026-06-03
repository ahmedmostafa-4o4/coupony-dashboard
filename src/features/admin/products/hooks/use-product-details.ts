"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getProductById } from "../api/get-product-by-id";
import type { Product } from "../types/product.types";

export function useProductDetails(productId: string) {
  return useAdminResource<Product>({
    id: productId,
    getItem: getProductById,
  });
}
