"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { RolesFilters } from "../components/roles-filters";
import { RoleForm } from "../components/role-form";
import { RolesTable } from "../components/roles-table";
import { useRoleActions } from "../hooks/use-role-actions";
import { useRolesList } from "../hooks/use-roles-list";
import type { RolesListFilters } from "../types/role.types";

const defaultFilters: RolesListFilters = { search: "", status: "all" };

export function RolesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<RolesListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useRolesList(filters);
  const actions = useRoleActions(async () => { await listState.reload(); });

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
              Create role
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Control role definitions and permission bundles."
        eyebrow="Admin"
        title="Roles"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Roles currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <RolesFilters
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
        <RoleForm
          description="Create a reusable admin role with a typed DTO payload."
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel="Create role"
          title="Create role"
        />
      ) : null}
      <RolesTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "roles",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected role."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title="Delete Role"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
