import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import type { NotifyMeRequest } from "../types/notify-me-request.types";

const columns: AdminColumn<NotifyMeRequest>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "userId",
    header: "User ID",
    accessorKey: "userId",
  },
  {
    id: "channel",
    header: "Channel",
    accessorKey: "channel",
  },
  {
    id: "targetType",
    header: "Target Type",
    accessorKey: "targetType",
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function NotifyMeRequestsTable({
  items,
  renderActions,
}: {
  items: NotifyMeRequest[];
  renderActions?: (item: NotifyMeRequest) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any notify me requests yet."
      emptyTitle="No notify me requests found"
    />
  );
}
