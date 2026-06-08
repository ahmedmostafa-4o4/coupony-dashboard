import { CardGrid } from "@/components/ui/card";
import { KpiCard } from "@/features/admin/shared";
import { DollarSignIcon, StoreIcon, UsersIcon, StarIcon } from "lucide-react";

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
      <KpiCard
        title={dict.totalSalesVolume}
        value={financial?.totalSalesVolume ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(financial.totalSalesVolume) : "$0.00"}
        icon={<DollarSignIcon />}
      />
      <KpiCard
        title={dict.totalActiveStores}
        value={growth?.totalStores || 0}
        description={financial?.premiumStores ? dict.premiumStores.replace("{{count}}", financial.premiumStores.toString()) : undefined}
        icon={<StoreIcon />}
      />
      <KpiCard
        title={dict.totalUsers}
        value={growth?.totalUsers || 0}
        description={growth?.newUsersThisMonth ? dict.newUsers.replace("{{count}}", growth.newUsersThisMonth.toString()) : undefined}
        icon={<UsersIcon />}
      />
      <KpiCard
        title={dict.averageStoreRating}
        value={financial?.averageStoreRating ? `${financial.averageStoreRating} ⭐` : "0 ⭐"}
        icon={<StarIcon />}
      />
    </CardGrid>
  );
}
