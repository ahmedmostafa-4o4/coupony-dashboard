import type { ReactNode } from "react";

import { AdminEmptyState } from "@/features/admin/shared/components/admin-empty-state";
import type { AdminColumn } from "@/features/admin/shared/types/admin-common.types";
import { formatAdminValue } from "@/features/admin/shared/utils/admin-formatters";
import { cn } from "@/lib/utils/cn";

function readValue<TData>(item: TData, accessorKey?: keyof TData | string) {
  if (!accessorKey) {
    return undefined;
  }

  return String(accessorKey)
    .split(".")
    .reduce<unknown>((currentValue, currentKey) => {
      if (!currentValue || typeof currentValue !== "object") {
        return undefined;
      }

      return (currentValue as Record<string, unknown>)[currentKey];
    }, item as unknown);
}

export function AdminDataTable<TData>({
  caption,
  columns,
  data,
  rowKey,
  renderRowActions,
  emptyTitle = "No records found",
  emptyDescription = "The API returned no rows for this view yet.",
}: {
  caption?: string;
  columns: AdminColumn<TData>[];
  data: TData[];
  rowKey: (item: TData) => string;
  renderRowActions?: (item: TData) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (!data.length) {
    return (
      <AdminEmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
              {renderRowActions ? (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={rowKey(item)} className="align-top">
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn("px-4 py-4 text-sm text-slate-600", column.className)}
                  >
                    {column.cell
                      ? column.cell(item)
                      : formatAdminValue(readValue(item, column.accessorKey))}
                  </td>
                ))}
                {renderRowActions ? (
                  <td className="px-4 py-4 text-right text-sm text-slate-600">
                    {renderRowActions(item)}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
