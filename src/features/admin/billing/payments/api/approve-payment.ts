import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

export async function approvePaymentSession(
  sessionId: string,
  paymentMethod: string,
  notes?: string
) {
  const response = await apiClient.post(
    apiEndpoints.admin.billing.paymentSessions.approve(sessionId),
    { payment_method: paymentMethod, notes }
  );
  return response;
}
