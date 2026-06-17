"use client";
import { useState } from "react";
import type { GlobalDictionary } from "@/messages/get-dictionary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard, createAdminDetailHref } from "@/features/admin/shared";
import { RepeatIcon } from "lucide-react";
import { SubscriptionsFilters } from "../components/subscriptions-filters";
import { SubscriptionsTable } from "../components/subscriptions-table";
import { SubscriptionAnalyticsWidget } from "../components/subscription-analytics-widget";
import { SuspendSubscriptionDialog, CancelSubscriptionDialog } from "../components/subscription-action-dialogs";
import { useSubscriptionsList } from "../hooks/use-subscriptions-list";
import type { SubscriptionsListFilters } from "../types/subscription.types";

const defaultFilters: SubscriptionsListFilters = { search: "", status: "all" };

export function SubscriptionsListPage({ lang, dict }: { lang: string; dict: GlobalDictionary }) {
  const [filters, setFilters] = useState<SubscriptionsListFilters>(defaultFilters);
  const [suspendId, setSuspendId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const listState = useSubscriptionsList(filters);
  

  return (
    <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      <AdminPageHeader
        actions={
          <>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              {dict.adminSubscriptions.list.reload}
            </Button>
          </>
        }
        description={dict.adminSubscriptions.list.description}
        eyebrow={dict.adminSubscriptions.list.eyebrow}
        title={dict.adminSubscriptions.list.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          description={dict.adminSubscriptions.list.rowsHint || "Subscriptions currently loaded from the API response."}
          title={dict.adminSubscriptions.list.rows}
          value={listState.total}
          icon={<RepeatIcon />}
        />
      </div>

      <SubscriptionAnalyticsWidget dict={dict} />

      <SubscriptionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict}
      />
      {listState.error ? (
        <AdminSection title={dict.adminSubscriptions.list.requestError}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <SubscriptionsTable
        dict={dict}
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "subscriptions",
                String(item.id ?? ""),
              )}
            >
              {dict.adminSubscriptions.list.view}
            </Link>
            {item.status === "active" && (
              <>
                <Button variant="outline" onClick={() => setSuspendId(item.id)}>{dict.adminSubscriptions.dialogs.suspendTitle || "Suspend"}</Button>
                <Button variant="danger" onClick={() => setCancelId(item.id)}>{dict.adminSubscriptions.list.cancel}</Button>
              </>
            )}
          </div>
        )}
      />

      {suspendId && (
        <SuspendSubscriptionDialog
          subscriptionId={suspendId}
          open={!!suspendId}
          onOpenChange={(open) => !open && setSuspendId(null)}
          onSuccess={() => void listState.reload()}
          dict={dict}
        />
      )}

      {cancelId && (
        <CancelSubscriptionDialog
          subscriptionId={cancelId}
          open={!!cancelId}
          onOpenChange={(open) => !open && setCancelId(null)}
          onSuccess={() => void listState.reload()}
          dict={dict}
        />
      )}
    </div>
  );
}
