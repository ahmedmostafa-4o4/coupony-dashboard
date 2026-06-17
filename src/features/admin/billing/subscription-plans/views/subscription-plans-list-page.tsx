"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { LayersIcon } from "lucide-react";
import { SubscriptionPlansFilters } from "../components/subscription-plans-filters";
import { SubscriptionPlanForm } from "../components/subscription-plan-form";
import { SubscriptionPlansTable } from "../components/subscription-plans-table";
import { useSubscriptionPlanActions } from "../hooks/use-subscription-plan-actions";
import { useSubscriptionPlansList } from "../hooks/use-subscription-plans-list";
import type { SubscriptionPlansListFilters } from "../types/subscription-plan.types";

import type { GlobalDictionary } from "@/messages/get-dictionary";

const defaultFilters: SubscriptionPlansListFilters = { search: "", status: "all" };

export function SubscriptionPlansListPage({ lang, dict }: { lang: string; dict: GlobalDictionary }) {
  const [filters, setFilters] = useState<SubscriptionPlansListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useSubscriptionPlansList(filters);
  const actions = useSubscriptionPlanActions(async () => { await listState.reload(); });

  return (
    <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      <AdminPageHeader
        actions={
          <>
            <Button
              key="createAction"
              variant="secondary"
              onClick={() => setActiveComposer("createAction")}
            >
              {dict.adminSubscriptionPlans.list.create}
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              {dict.adminSubscriptionPlans.list.reload}
            </Button>
          </>
        }
        description={dict.adminSubscriptionPlans.list.description}
        eyebrow={dict.adminSubscriptionPlans.list.eyebrow}
        title={dict.adminSubscriptionPlans.list.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          description={dict.adminSubscriptionPlans.list.rowsHint || "Plans currently loaded in this view."}
          title={dict.adminSubscriptionPlans.list.rows}
          value={listState.total}
          icon={<LayersIcon />}
        />
      </div>
      <SubscriptionPlansFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict}
      />
      {listState.error ? (
        <AdminSection title={dict.adminSubscriptionPlans.list.requestError}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "createAction" ? (
        <SubscriptionPlanForm
          dict={dict}
          description={dict.adminSubscriptionPlans.form.createDesc}
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel={dict.adminSubscriptionPlans.form.save}
          title={dict.adminSubscriptionPlans.form.createTitle}
        />
      ) : null}
      <SubscriptionPlansTable
        dict={dict}
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "subscriptionPlans",
                String(item.id ?? ""),
              )}
            >
              {dict.adminSubscriptionPlans.list.edit}
            </Link>
            <AdminConfirmDialog
              confirmLabel={dict.adminSubscriptionPlans.list.delete}
              description={dict.adminSubscriptionPlans.list.description}
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title={dict.adminSubscriptionPlans.list.delete}
              triggerLabel={dict.adminSubscriptionPlans.list.delete}
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
