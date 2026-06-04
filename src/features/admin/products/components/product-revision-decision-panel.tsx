import { ProductRevisionStatusBadge } from "./product-revision-status-badge";
import type { ProductsDictionary } from "../utils/get-dictionary";

import type { ProductRevision } from "../types/product-revision.types";

export function ProductRevisionDecisionPanel({
  revision,
  dict,
  statusDict,
}: {
  revision: ProductRevision;
  dict: ProductsDictionary["revisionDecision"];
  statusDict?: Record<string, string>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {dict.status}
        </p>
        <div className="mt-2">
          <ProductRevisionStatusBadge
            value={revision.statusLabel ?? revision.status}
            dict={statusDict}
          />
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {dict.action}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-900">
          {revision.actionLabel ?? "—"}
        </p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {dict.submittedBy}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-900">
          {revision.submittedBy ?? "—"}
        </p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {dict.notes}
        </p>
        <p className="mt-2 text-sm text-slate-700">
          {revision.reason ?? revision.notes ?? dict.noNotes}
        </p>
      </div>
    </div>
  );
}

