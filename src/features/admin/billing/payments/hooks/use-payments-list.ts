"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getPayments } from "../api/get-payments";
import type { Payment, PaymentsListFilters } from "../types/payment.types";

export function usePaymentsList(filters: PaymentsListFilters) {
  return useAdminCollection<Payment, PaymentsListFilters>({
    filters,
    getItems: getPayments,
  });
}
