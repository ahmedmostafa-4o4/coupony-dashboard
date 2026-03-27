import type { AdminItemResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminDashboardSummaryDto } from "./dashboard.dto";

export interface DashboardMetric {
  hint?: string;
  label: string;
  value: number | string;
}

export type DashboardOverview = Camelized<{
  summary: AdminDashboardSummaryDto;
}> & {
  metrics?: DashboardMetric[];
};

export type DashboardOverviewResult = AdminItemResult<DashboardOverview>;
