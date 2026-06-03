import { CardGrid } from "@/components/ui/card";
import { AdminStatCard } from "@/features/admin/shared";

import type { DashboardOverview } from "../types/dashboard.types";
import type { DashboardDictionary } from "../utils/get-dictionary";

export function DashboardOverviewGrid({
  overview,
  dict,
}: {
  overview: DashboardOverview | null;
  dict: DashboardDictionary["dashboard"]["overview"];
}) {
  if (!overview) {
    return null;
  }

  const { growth, financial } = overview;

  return (
    <CardGrid>
      <AdminStatCard
        label={dict.totalSalesVolume}
        value={financial?.totalSalesVolume ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(financial.totalSalesVolume) : "$0.00"}
      />
      <AdminStatCard
        label={dict.totalActiveStores}
        value={growth?.totalStores || 0}
        hint={financial?.premiumStores ? dict.premiumStores.replace("{{count}}", financial.premiumStores.toString()) : undefined}
      />
      <AdminStatCard
        label={dict.totalUsers}
        value={growth?.totalUsers || 0}
        hint={growth?.newUsersThisMonth ? dict.newUsers.replace("{{count}}", growth.newUsersThisMonth.toString()) : undefined}
      />
      <AdminStatCard
        label={dict.averageStoreRating}
        value={financial?.averageStoreRating ? `${financial.averageStoreRating} ⭐` : "0 ⭐"}
      />
    </CardGrid>
  );
}
