"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getSellerTickets } from "../api/get-seller-tickets";
import type { SellerTicket, SellerTicketsListFilters } from "../types/seller-ticket.types";

export function useSellerTicketsList(filters: SellerTicketsListFilters) {
  return useAdminCollection<SellerTicket, SellerTicketsListFilters>({
    filters,
    getItems: getSellerTickets,
  });
}
