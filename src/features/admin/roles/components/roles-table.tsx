import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { RoleStatusBadge } from "./role-status-badge";

import type { Role } from "../types/role.types";

const columns: AdminColumn<Role>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <RoleStatusBadge value={item.status} />,
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function RolesTable({
  items,
  renderActions,
}: {
  items: Role[];
  renderActions?: (item: Role) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any roles yet."
      emptyTitle="No roles found"
    />
  );
}
