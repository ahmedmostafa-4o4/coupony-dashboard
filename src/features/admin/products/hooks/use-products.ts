"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getProducts } from "../api/get-products";
import type { Product, ProductsListFilters } from "../types/product.types";

export function useProducts(filters: ProductsListFilters) {
  return useAdminCollection<Product, ProductsListFilters>({
    filters,
    getItems: getProducts,
  });
}
