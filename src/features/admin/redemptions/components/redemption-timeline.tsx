import {
  AdminSection,
  AdminStatusBadge,
  formatAdminDate,
} from "@/features/admin/shared";

import type { RedemptionTimelineEntry } from "../types/redemption.types";

export function RedemptionTimeline({
  items,
}: {
  items: RedemptionTimelineEntry[];
}) {
  return (
    <AdminSection
      description="Event entries returned by the redemption timeline endpoint."
      title="Timeline"
    >
      <div className="space-y-4">
        {items.length ? (
          items.map((item) => (
            <div
              key={String(item.id ?? item.timestamp ?? JSON.stringify(item))}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">
                  {String(item.message ?? item.type ?? item.id ?? "Timeline entry")}
                </p>
                <AdminStatusBadge value={item.status ?? item.type ?? "recorded"} />
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {formatAdminDate(item.timestamp)}
              </p>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-600">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">
            No timeline events were returned for this redemption.
          </p>
        )}
      </div>
    </AdminSection>
  );
}
