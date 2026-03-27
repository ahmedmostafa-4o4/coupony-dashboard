import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminWaiveCommissionResponseDto } from "../types/commissions.dto";
import type { CommissionActionRequest } from "../types/commission.types";

export async function waiveCommission(
  commissionId: string,
  payload: CommissionActionRequest = {}
) {
  return apiClient.post<AdminWaiveCommissionResponseDto, CommissionActionRequest>(
    apiEndpoints.admin.billing.commissions.waive(commissionId),
    payload
  );
}
