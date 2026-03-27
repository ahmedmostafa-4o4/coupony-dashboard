"use client";

import { useAdminAction } from "@/features/admin/shared";

import { updateCustomerTicket } from "../api/update-customer-ticket";
import type { UpdateCustomerTicketRequest } from "../types/customer-ticket.types";

export function useCustomerTicketActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    updateAction: useAdminAction({
      action: ({
        ticketId,
        payload,
      }: {
        ticketId: string;
        payload: UpdateCustomerTicketRequest;
      }) => updateCustomerTicket(ticketId, payload),
      onSuccess,
    }),
  };
}
