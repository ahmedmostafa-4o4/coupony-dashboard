import type { ReactNode } from "react";
import Image from "next/image";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { UserStatusBadge } from "./user-status-badge";

import type { User } from "../types/user.types";

import type { UsersDictionary } from "../utils/get-dictionary";

export function UsersTable({
  items,
  renderActions,
  dict,
}: {
  items: User[];
  renderActions?: (item: User) => ReactNode;
  dict: UsersDictionary["table"];
}) {
  const columns: AdminColumn<User>[] = [
    {
      id: "avatar",
      header: "",
      cell: (item) => (
        <div className="flex items-center">
          {item.profile?.avatar ? (
            <Image
              src={item.profile.avatar}
              alt={item.fullName ?? item.name ?? "User"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover shadow-sm ring-1 ring-slate-200"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              {(item.fullName ?? item.name ?? "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "id",
      header: dict.id,
      accessorKey: "id",
    },
    {
      id: "name",
      header: dict.name,
      accessorKey: "name",
    },
    {
      id: "email",
      header: dict.email,
      accessorKey: "email",
    },
    {
      id: "status",
      header: dict.status,
      cell: (item) => <UserStatusBadge value={item.status} />,
    },
    {
      id: "createdAt",
      header: dict.created,
      cell: (item) => formatAdminDate(item.createdAt),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.emptyDesc}
      emptyTitle={dict.emptyTitle}
    />
  );
}
