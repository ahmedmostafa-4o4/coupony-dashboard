import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapProduct } from "../utils/product.mappers";
import type { AdminProductsListResponseDto } from "../types/products.dto";
import type { ProductsListFilters } from "../types/product.types";

export async function getProducts(filters: ProductsListFilters = {}) {
  const response = await apiClient.get<AdminProductsListResponseDto>(
    apiEndpoints.admin.products.list,
    {
      query: {
        approval_status:
          filters.approvalStatus && filters.approvalStatus !== "all"
            ? filters.approvalStatus
            : undefined,
        per_page: filters.perPage || undefined,
        page: filters.page || 1,
        search: filters.search || undefined,
        status:
          filters.status && filters.status !== "all" ? filters.status : undefined,
        store_id: filters.storeId || undefined,
      },
    }
  );

  return mapPaginatedResponse(response, mapProduct);
}
