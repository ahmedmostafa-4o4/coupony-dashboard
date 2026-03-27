"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { UsersFilters } from "../components/users-filters";
import { UserForm } from "../components/user-form";
import { UsersTable } from "../components/users-table";
import { useUserActions } from "../hooks/use-user-actions";
import { useUserStatistics } from "../hooks/use-user-statistics";
import { useUsersList } from "../hooks/use-users-list";
import type { UsersListFilters } from "../types/user.types";

const defaultFilters: UsersListFilters = { search: "", status: "all" };

export function UsersListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<UsersListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useUsersList(filters);
  const statisticsState = useUserStatistics();
  const actions = useUserActions(async () => {
    await Promise.all([listState.reload(), statisticsState.reload()]);
  });

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
              Create user
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Manage activation, suspension, and role assignment workflows."
        eyebrow="Admin"
        title="Users"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          hint="Total user accounts returned by the statistics endpoint."
          label="Total"
          value={statisticsState.item?.total ?? listState.total}
        />
        <AdminStatCard
          hint="Currently active users."
          label="Active"
          value={statisticsState.item?.active ?? "-"}
        />
        <AdminStatCard
          hint="Customer accounts."
          label="Customers"
          value={statisticsState.item?.customers ?? "-"}
        />
        <AdminStatCard
          hint="Seller accounts."
          label="Sellers"
          value={statisticsState.item?.sellers ?? "-"}
        />
        <AdminStatCard
          hint="Pending seller approvals."
          label="Pending Sellers"
          value={statisticsState.item?.pendingSellers ?? "-"}
        />
      </div>
      <UsersFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {statisticsState.error ? (
        <AdminSection title="Statistics error">
          <p className="text-sm text-rose-600">{statisticsState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "createAction" ? (
        <UserForm
          description="Create an admin-managed user with the typed request contract."
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel="Create user"
          title="Create user"
        />
      ) : null}
      <UsersTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "users",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Activate"
              description="This will call the mapped admin endpoint for the selected user."
              isPending={actions.activateAction.isSubmitting}
              onConfirm={async () => {
                await actions.activateAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title="Activate User"
              triggerLabel="Activate"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Suspend"
              description="This will call the mapped admin endpoint for the selected user."
              isPending={actions.suspendAction.isSubmitting}
              onConfirm={async () => {
                await actions.suspendAction.submit({
                  userId: String(item.id ?? ""),
                });
              }}
              title="Suspend User"
              triggerLabel="Suspend"
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
