"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getCustomerTickets } from "../api/get-customer-tickets";
import type { CustomerTicket, CustomerTicketsListFilters } from "../types/customer-ticket.types";

export function useCustomerTicketsList(filters: CustomerTicketsListFilters) {
  return useAdminCollection<CustomerTicket, CustomerTicketsListFilters>({
    filters,
    getItems: getCustomerTickets,
  });
}
