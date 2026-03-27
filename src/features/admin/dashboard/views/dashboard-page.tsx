"use client";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminPageHeader,
  AdminRecordGrid,
  AdminSection,
} from "@/features/admin/shared";

import { DashboardOverviewGrid } from "../components/dashboard-overview-grid";
import { useDashboardOverview } from "../hooks/use-dashboard-overview";

export function DashboardPage({ lang }: { lang: string }) {
  const dashboardState = useDashboardOverview();

  void lang;

  if (dashboardState.isLoading) {
    return <PageLoading label="Loading dashboard overview..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="High-level operational visibility across marketplace, catalog, billing, and support surfaces."
        eyebrow="Overview"
        title="Dashboard"
      />
      {dashboardState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{dashboardState.error}</p>
        </AdminSection>
      ) : null}
      <DashboardOverviewGrid overview={dashboardState.item} />
      <AdminSection
        description="Structured dashboard data currently returned by the backend."
        title="Overview payload"
      >
        <AdminRecordGrid value={dashboardState.item} />
      </AdminSection>
      <AdminSection
        description="Raw API payload kept visible while backend contracts are still evolving."
        title="Raw API payload"
      >
        <AdminRecordGrid value={dashboardState.raw} />
      </AdminSection>
    </div>
  );
}
