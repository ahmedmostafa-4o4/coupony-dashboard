import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateCustomerTicketResponseDto } from "../../contact.dto";
import type { UpdateCustomerTicketRequest } from "../types/customer-ticket.types";

export async function updateCustomerTicket(
  ticketId: string,
  payload: UpdateCustomerTicketRequest
) {
  return apiClient.patch<
    AdminUpdateCustomerTicketResponseDto,
    UpdateCustomerTicketRequest
  >(apiEndpoints.admin.contact.customer.detail(ticketId), payload);
}
