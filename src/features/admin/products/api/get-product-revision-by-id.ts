import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapProductRevisionDetails } from "../utils/product-revision.mappers";
import type { AdminProductRevisionDetailsResponseDto } from "../types/products.dto";

export async function getProductRevisionById(revisionId: string) {
  const response = await apiClient.get<AdminProductRevisionDetailsResponseDto>(
    apiEndpoints.admin.products.revisions.detail(revisionId)
  );

  return mapItemResponse(response, mapProductRevisionDetails);
}
