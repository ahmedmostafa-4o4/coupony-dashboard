import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn } from "@/features/admin/shared";

import type { Permission } from "../types/permission.types";

const columns: AdminColumn<Permission>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "key",
    header: "Key",
    accessorKey: "key",
  },
  {
    id: "resource",
    header: "Resource",
    accessorKey: "resource",
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
];

export function PermissionsTable({
  items,
  renderActions,
}: {
  items: Permission[];
  renderActions?: (item: Permission) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any permissions yet."
      emptyTitle="No permissions found"
    />
  );
}
