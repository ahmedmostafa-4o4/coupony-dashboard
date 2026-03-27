import { CardGrid } from "@/components/ui/card";
import { AdminStatCard } from "@/features/admin/shared";

import type {
  DashboardMetric,
  DashboardOverview,
} from "../types/dashboard.types";

function inferMetrics(payload: DashboardOverview | null) {
  if (!payload) {
    return [] as DashboardMetric[];
  }

  if (Array.isArray(payload.metrics) && payload.metrics.length) {
    return payload.metrics;
  }

  return Object.entries(payload)
    .flatMap(([key, value]) =>
      typeof value === "number" || typeof value === "string"
        ? [
            {
              hint: "Derived from the dashboard payload.",
              label: key.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
              value,
            },
          ]
        : []
    )
    .slice(0, 6)
    ;
}

export function DashboardOverviewGrid({
  overview,
}: {
  overview: DashboardOverview | null;
}) {
  const metrics = inferMetrics(overview);

  if (!metrics.length) {
    return null;
  }

  return (
    <CardGrid>
      {metrics.map((metric) => (
        <AdminStatCard
          key={metric.label}
          hint={metric.hint}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </CardGrid>
  );
}
