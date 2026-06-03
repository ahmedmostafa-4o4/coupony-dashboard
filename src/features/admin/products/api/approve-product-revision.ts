import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminApproveProductRevisionResponseDto } from "../types/products.dto";
import type { ApproveProductRevisionRequest } from "../types/product-revision.types";

export async function approveProductRevision(
  revisionId: string,
  payload: ApproveProductRevisionRequest = {}
) {
  return apiClient.post<
    AdminApproveProductRevisionResponseDto,
    ApproveProductRevisionRequest
  >(apiEndpoints.admin.products.revisions.approve(revisionId), payload);
}
