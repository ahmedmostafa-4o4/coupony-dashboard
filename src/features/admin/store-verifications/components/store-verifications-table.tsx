import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { StoreVerificationStatusBadge } from "./store-verification-status-badge";

import type { StoreVerification } from "../types/store-verification.types";

const columns: AdminColumn<StoreVerification>[] = [
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
    id: "status",
    header: "Status",
    cell: (item) => <StoreVerificationStatusBadge value={item.status} />,
  },
  {
    id: "submittedAt",
    header: "Submitted",
    cell: (item) => formatAdminDate(item.createdAt),
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function StoreVerificationsTable({
  items,
  renderActions,
}: {
  items: StoreVerification[];
  renderActions?: (item: StoreVerification) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any store verifications yet."
      emptyTitle="No store verifications found"
    />
  );
}
