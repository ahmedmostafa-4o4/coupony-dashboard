"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AdminPageHeader, AdminSection, KpiCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { ShieldIcon } from "lucide-react";
import { RolesFilters } from "../components/roles-filters";
import { RoleForm } from "../components/role-form";
import { RolesTable } from "../components/roles-table";
import { useRoleActions } from "../hooks/use-role-actions";
import { useRolesList } from "../hooks/use-roles-list";
import type { RolesListFilters } from "../types/role.types";
import { usePermissionsList } from "../../permissions/hooks/use-permissions-list";

const defaultFilters: RolesListFilters = { search: "", status: "all" };

export function RolesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<RolesListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  const listState = useRolesList(filters);
  const permissionsState = usePermissionsList({ perPage: 1000 });
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
        <KpiCard
          description="Roles currently loaded from the API response."
          title="Rows"
          value={listState.total}
          icon={<ShieldIcon />}
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
      <Dialog
        open={activeComposer === "createAction"}
        onOpenChange={(open) => setActiveComposer(open ? "createAction" : null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          <DialogTitle className="sr-only">Create role</DialogTitle>
          {activeComposer === "createAction" ? (
            <RoleForm
              description="Create a reusable admin role with a typed DTO payload."
              isSubmitting={actions.createAction.isSubmitting}
              permissionsList={permissionsState.items}
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
        </DialogContent>
      </Dialog>
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
