import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { UserStatusBadge } from "./user-status-badge";

import type { User } from "../types/user.types";

const columns: AdminColumn<User>[] = [
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
    id: "email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <UserStatusBadge value={item.status} />,
  },
  {
    id: "createdAt",
    header: "Created",
    cell: (item) => formatAdminDate(item.createdAt),
  },
];

export function UsersTable({
  items,
  renderActions,
}: {
  items: User[];
  renderActions?: (item: User) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any users yet."
      emptyTitle="No users found"
    />
  );
}
