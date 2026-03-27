import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminMarkCommissionPaidResponseDto } from "../types/commissions.dto";
import type { CommissionActionRequest } from "../types/commission.types";

export async function markCommissionPaid(
  commissionId: string,
  payload: CommissionActionRequest = {}
) {
  return apiClient.post<
    AdminMarkCommissionPaidResponseDto,
    CommissionActionRequest
  >(apiEndpoints.admin.billing.commissions.markPaid(commissionId), payload);
}
