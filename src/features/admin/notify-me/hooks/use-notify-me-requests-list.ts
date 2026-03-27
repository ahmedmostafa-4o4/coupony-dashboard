"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getNotifyMeRequests } from "../api/get-notify-me-requests";
import type { NotifyMeRequest, NotifyMeRequestsListFilters } from "../types/notify-me-request.types";

export function useNotifyMeRequestsList(filters: NotifyMeRequestsListFilters) {
  return useAdminCollection<NotifyMeRequest, NotifyMeRequestsListFilters>({
    filters,
    getItems: getNotifyMeRequests,
  });
}
