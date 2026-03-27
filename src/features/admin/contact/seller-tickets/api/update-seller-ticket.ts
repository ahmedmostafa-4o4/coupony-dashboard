import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateSellerLeadResponseDto } from "../../contact.dto";
import type { UpdateSellerTicketRequest } from "../types/seller-ticket.types";

export async function updateSellerTicket(
  ticketId: string,
  payload: UpdateSellerTicketRequest
) {
  return apiClient.patch<AdminUpdateSellerLeadResponseDto, UpdateSellerTicketRequest>(
    apiEndpoints.admin.contact.seller.detail(ticketId),
    payload
  );
}
