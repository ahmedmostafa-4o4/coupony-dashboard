import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminMarkCommissionInvoicedResponseDto } from "../types/commissions.dto";
import type { CommissionActionRequest } from "../types/commission.types";

export async function markCommissionInvoiced(
  commissionId: string,
  payload: CommissionActionRequest = {}
) {
  return apiClient.post<
    AdminMarkCommissionInvoicedResponseDto,
    CommissionActionRequest
  >(apiEndpoints.admin.billing.commissions.markInvoiced(commissionId), payload);
}
