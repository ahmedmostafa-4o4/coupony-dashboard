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
    cell: (item) => item.causer ? `${item.causer.firstName || ""} ${item.causer.lastName || ""}`.trim() || item.causer.email || String(item.causer.id) : item.causerId ? String(item.causerId) : "-",
  },
  {
    id: "action",
    header: "Action",
    cell: (item) => (item.event || item.description || "-").toUpperCase(),
  },
  {
    id: "target",
    header: "Target",
    cell: (item) => item.subjectType ? `${item.subjectType.split('\\').pop()} #${item.subjectId || '?'}` : "-",
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
