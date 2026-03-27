import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import type { BillingProfile } from "../types/billing-profile.types";

const columns: AdminColumn<BillingProfile>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "storeId",
    header: "Store ID",
    accessorKey: "storeId",
  },
  {
    id: "billingModel",
    header: "Billing Model",
    accessorKey: "billingModel",
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function BillingProfilesTable({
  items,
  renderActions,
}: {
  items: BillingProfile[];
  renderActions?: (item: BillingProfile) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any billing profiles yet."
      emptyTitle="No billing profiles found"
    />
  );
}
