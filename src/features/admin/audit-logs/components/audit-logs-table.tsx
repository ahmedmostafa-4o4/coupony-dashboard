import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";

import type { AuditLog } from "../types/audit-log.types";

const columns: AdminColumn<AuditLog>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "actor",
    header: "Actor",
    accessorKey: "actor",
  },
  {
    id: "action",
    header: "Action",
    accessorKey: "action",
  },
  {
    id: "target",
    header: "Target",
    accessorKey: "target",
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function AuditLogsTable({
  items,
  renderActions,
}: {
  items: AuditLog[];
  renderActions?: (item: AuditLog) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any audit logs yet."
      emptyTitle="No audit logs found"
    />
  );
}
