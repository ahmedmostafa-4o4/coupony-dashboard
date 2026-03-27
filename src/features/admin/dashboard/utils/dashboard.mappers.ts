import type { Camelized } from "@/types";

import type { AdminDashboardResponseDto } from "../types/dashboard.dto";
import type { DashboardOverview } from "../types/dashboard.types";

const metricLabels: Record<string, string> = {
  issuedInvoicesCount: "Issued invoices",
  pendingCommissionsCount: "Pending commissions",
  pendingOffersCount: "Pending offers",
  pendingStoresCount: "Pending stores",
  redemptionsCount: "Redemptions",
  storesCount: "Stores",
  usersCount: "Users",
};

export function mapDashboardOverview(
  data: Camelized<AdminDashboardResponseDto["data"]>
): DashboardOverview {
  const summary = data.summary ?? {};
  const metrics = Object.entries(summary)
    .filter((entry): entry is [string, string | number] => {
      return typeof entry[1] === "string" || typeof entry[1] === "number";
    })
    .map(([key, value]) => ({
      hint: "Derived from the admin dashboard summary payload.",
      label: metricLabels[key] ?? key,
      value,
    }));

  return {
    metrics,
    summary,
  };
}
