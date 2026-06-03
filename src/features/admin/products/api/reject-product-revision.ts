import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminRejectProductRevisionResponseDto } from "../types/products.dto";
import type { RejectProductRevisionRequest } from "../types/product-revision.types";

export async function rejectProductRevision(
  revisionId: string,
  payload: RejectProductRevisionRequest
) {
  return apiClient.post<
    AdminRejectProductRevisionResponseDto,
    RejectProductRevisionRequest
  >(apiEndpoints.admin.products.revisions.reject(revisionId), payload);
}
