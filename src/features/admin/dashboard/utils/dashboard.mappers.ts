import type { Camelized } from "@/types";

import type { AdminDashboardResponseDto } from "../types/dashboard.dto";
import type { DashboardOverview } from "../types/dashboard.types";

export function mapDashboardOverview(
  data: Camelized<AdminDashboardResponseDto["data"]>
): DashboardOverview {
  return {
    growth: data.growth,
    financial: data.financial,
    pointsEconomy: data.pointsEconomy,
    operational: data.operational,
    charts: data.charts,
  };
}

