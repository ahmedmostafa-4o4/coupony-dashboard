import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapProductRevision } from "../utils/product-revision.mappers";
import type { AdminPendingProductRevisionsListResponseDto } from "../types/products.dto";

export async function getPendingProductRevisions() {
  const response = await apiClient.get<AdminPendingProductRevisionsListResponseDto>(
    apiEndpoints.admin.products.revisions.pending
  );

  return mapPaginatedResponse(response, mapProductRevision);
}
