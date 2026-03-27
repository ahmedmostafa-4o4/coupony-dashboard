"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getDashboardOverview } from "../api/get-dashboard";
import type { DashboardOverview } from "../types/dashboard.types";

export function useDashboardOverview() {
  return useAdminResource<DashboardOverview>({
    getItem: async () => getDashboardOverview(),
    id: "dashboard",
  });
}
