"use client";

import type { ReactNode } from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import type { Banner } from "../types/banner.types";
import { BannerStatusBadge } from "./banner-status-badge";
import type { BannersDictionary } from "../utils/get-dictionary";

export function BannersTable({
  items,
  dict,
  renderActions,
}: {
  items: Banner[];
  dict: BannersDictionary;
  renderActions?: (item: Banner) => ReactNode;
}) {
  const columns: AdminColumn<Banner>[] = [
    {
      id: "banner",
      header: dict.list.columns.banner,
      cell: (banner) => (
        <div className="flex items-center gap-3 py-1">
          {banner.imageUrl ? (
            <img
              src={banner.imageUrl}
              alt="Banner"
              className="h-10 w-16 rounded object-cover border border-slate-200"
            />
          ) : (
            <div className="flex h-10 w-16 items-center justify-center rounded border border-slate-200 bg-slate-50 text-xs text-slate-400">
              No Img
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 line-clamp-1 max-w-[200px]">
              {banner.discountLabel || "No discount label"}
            </span>
            <span className="text-xs text-slate-500">
              {formatAdminDate(banner.createdAt)}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "store",
      header: dict.list.columns.store,
      cell: (banner) => (
        <span className="text-sm text-slate-600">
          {banner.store?.name || "Unknown Store"}
        </span>
      ),
    },
    {
      id: "priority",
      header: dict.list.columns.priority,
      cell: (banner) => (
        <span className="text-sm font-mono text-slate-600">{banner.priority}</span>
      ),
    },
    {
      id: "status",
      header: dict.list.columns.status,
      cell: (banner) => (
        <BannerStatusBadge value={banner.status} dict={dict} />
      ),
    },
    {
      id: "active",
      header: dict.list.columns.active,
      cell: (banner) => (
        <span className="text-sm">
          {banner.isActive ? (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle className="h-4 w-4" /> Yes
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-400">
              <XCircle className="h-4 w-4" /> No
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id)}
      renderRowActions={renderActions}
      emptyDescription={dict.list.emptyStateDesc}
      emptyTitle={dict.list.emptyState}
    />
  );
}
