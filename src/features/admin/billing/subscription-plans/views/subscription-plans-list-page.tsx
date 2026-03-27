"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { SubscriptionPlansFilters } from "../components/subscription-plans-filters";
import { SubscriptionPlanForm } from "../components/subscription-plan-form";
import { SubscriptionPlansTable } from "../components/subscription-plans-table";
import { useSubscriptionPlanActions } from "../hooks/use-subscription-plan-actions";
import { useSubscriptionPlansList } from "../hooks/use-subscription-plans-list";
import type { SubscriptionPlansListFilters } from "../types/subscription-plan.types";

const defaultFilters: SubscriptionPlansListFilters = { search: "", status: "all" };

export function SubscriptionPlansListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<SubscriptionPlansListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useSubscriptionPlansList(filters);
  const actions = useSubscriptionPlanActions(async () => { await listState.reload(); });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button
              key="createAction"
              variant="secondary"
              onClick={() => setActiveComposer("createAction")}
            >
              Create plan
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Maintain the subscription plan catalog and pricing metadata."
        eyebrow="Admin"
        title="Subscription Plans"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Subscription Plans currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <SubscriptionPlansFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "createAction" ? (
        <SubscriptionPlanForm
          description="Create a subscription plan using the typed plan DTO."
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel="Create plan"
          title="Create plan"
        />
      ) : null}
      <SubscriptionPlansTable
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
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected subscription plan."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title="Delete Subscription Plan"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
