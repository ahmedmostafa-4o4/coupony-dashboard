import type { AdminItemResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminDashboardGrowthDto,
  AdminDashboardFinancialDto,
  AdminDashboardPointsEconomyDto,
  AdminDashboardOperationalDto,
  AdminDashboardChartsDto,
} from "./dashboard.dto";

export type DashboardOverview = Camelized<{
  growth: AdminDashboardGrowthDto;
  financial: AdminDashboardFinancialDto;
  pointsEconomy: AdminDashboardPointsEconomyDto;
  operational: AdminDashboardOperationalDto;
  charts: AdminDashboardChartsDto;
}>;

export type DashboardOverviewResult = AdminItemResult<DashboardOverview>;
