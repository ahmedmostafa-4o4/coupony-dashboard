import { getCommissions } from "./get-commissions";

import { adaptCommissionDetailsFallback } from "../utils/commission-details.adapter";

export async function getCommissionById(commissionId: string) {
  const response = await getCommissions();

  return adaptCommissionDetailsFallback(commissionId, response);
}
