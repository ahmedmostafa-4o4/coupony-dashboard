"use client";

import type { ReactNode } from "react";
import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { CheckCircle2, Clock, XCircle } from "lucide-react";


import type { NotificationBroadcast } from "../types/notification-broadcast.types";
import type { NotificationsDictionary } from "../utils/get-dictionary";

export function BroadcastsTable({
  items,
  dict,
  renderActions,
}: {
  items: NotificationBroadcast[];
  dict: NotificationsDictionary;
  renderActions?: (item: NotificationBroadcast) => ReactNode;
}) {
  const columns: AdminColumn<NotificationBroadcast>[] = [
    {
      id: "title",
      header: dict.table.title,
      accessorKey: "title",
    },
    {
      id: "status",
      header: dict.table.status,
      cell: (item) => {
          const status = item.status;
          if (status === "completed") {
            return (
              <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3 w-3" />
                {dict.broadcastDetails.completed}
              </span>
            );
          }
          if (status === "failed") {
            return (
              <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700">
                <XCircle className="h-3 w-3" />
                {dict.broadcastDetails.failed}
              </span>
            );
          }
          return (
            <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500">
              <Clock className="h-3 w-3" />
              {status === "processing" ? dict.broadcastDetails.processing : dict.broadcastDetails.pending}
            </span>
          );
      },
    },
    {
      id: "channels",
      header: dict.broadcastForm.channel,
      cell: (item) => {
          const channels = item.channels || [];
          return (
            <div className="flex flex-wrap gap-1">
              {channels.map((channel) => (
                <span key={channel} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {channel}
                </span>
              ))}
            </div>
          );
      },
    },
    {
      id: "sent_failed",
      header: dict.table.sentFailed,
      cell: (item) => (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">{item.total_sent}</span>
            <span className="text-slate-300">/</span>
            <span className="text-rose-600 font-medium">{item.total_failed}</span>
          </div>
      ),
    },
    {
      id: "createdAt",
      header: dict.table.date,
      cell: (item) => formatAdminDate(item.created_at),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id)}
      renderRowActions={renderActions}
      emptyDescription={dict.broadcastList.noBroadcasts}
      emptyTitle={dict.broadcastList.history}
      actionsTitle={dict.table.actions}
    />
  );
}
