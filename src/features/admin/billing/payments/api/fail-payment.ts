import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function failPaymentSession(
  sessionId: string,
  reason?: string
) {
  const response = await apiClient.post(
    apiEndpoints.admin.billing.paymentSessions.fail(sessionId),
    { reason }
  );
  return response;
}
