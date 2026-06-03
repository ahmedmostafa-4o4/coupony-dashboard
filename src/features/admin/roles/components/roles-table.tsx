import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn } from "@/features/admin/shared";

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
    id: "permissions",
    header: "Permissions",
    cell: (item) => (
      <div className="flex flex-wrap gap-1">
        {item.permissions?.map((p) => (
          <span key={p.id} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
            {p.name}
          </span>
        ))}
      </div>
    ),
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
