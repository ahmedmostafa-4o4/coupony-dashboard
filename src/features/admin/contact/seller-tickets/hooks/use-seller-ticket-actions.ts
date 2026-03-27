"use client";

import { useAdminAction } from "@/features/admin/shared";

import { updateSellerTicket } from "../api/update-seller-ticket";
import type { UpdateSellerTicketRequest } from "../types/seller-ticket.types";

export function useSellerTicketActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    updateAction: useAdminAction({
      action: ({
        ticketId,
        payload,
      }: {
        ticketId: string;
        payload: UpdateSellerTicketRequest;
      }) => updateSellerTicket(ticketId, payload),
      onSuccess,
    }),
  };
}
