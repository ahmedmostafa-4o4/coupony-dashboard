"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  AdminPageHeader,
  AdminSection,
  AdminStatCard,
  AdminConfirmDialog,
  createAdminDetailHref,
  AdminPagination,
} from "@/features/admin/shared";
import { UsersFilters } from "../components/users-filters";
import { UserForm } from "../components/user-form";
import { UsersTable } from "../components/users-table";
import { useUserActions } from "../hooks/use-user-actions";
import { useUserStatistics } from "../hooks/use-user-statistics";
import { useUsersList } from "../hooks/use-users-list";
import type { UsersListFilters } from "../types/user.types";
import { getUsersDictionary } from "../utils/get-dictionary";
import { useRolesList } from "@/features/admin/roles/hooks/use-roles-list";

const defaultFilters: UsersListFilters = {
  search: "",
  status: "all",
  role: "all",
  page: 1,
  perPage: 15,
};

export function UsersListPage({ lang }: { lang: string }) {
  const dict = getUsersDictionary(lang);
  const [filters, setFilters] = useState<UsersListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);

  const listState = useUsersList(filters);
  const statisticsState = useUserStatistics();
  const rolesState = useRolesList({});
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
              {dict.list.create}
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              {dict.list.reload}
            </Button>
          </>
        }
        description={dict.list.description}
        eyebrow={dict.list.eyebrow}
        title={dict.list.title}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          hint={dict.list.stats.totalHint}
          label={dict.list.stats.total}
          value={statisticsState.item?.total ?? listState.total}
        />
        <AdminStatCard
          hint={dict.list.stats.activeHint}
          label={dict.list.stats.active}
          value={statisticsState.item?.active ?? "-"}
        />
        <AdminStatCard
          hint={dict.list.stats.suspendedHint}
          label={dict.list.stats.suspended}
          value={statisticsState.item?.suspended ?? "-"}
        />
        <AdminStatCard
          hint={dict.list.stats.deletedHint}
          label={dict.list.stats.deleted}
          value={statisticsState.item?.deleted ?? "-"}
        />
      </div>
      <UsersFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict.filters}
      />
      {listState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {statisticsState.error ? (
        <AdminSection title={dict.list.errors.statistics}>
          <p className="text-sm text-rose-600">{statisticsState.error}</p>
        </AdminSection>
      ) : null}
      <Dialog
        open={activeComposer === "createAction"}
        onOpenChange={(open) => setActiveComposer(open ? "createAction" : null)}
      >
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
          <DialogTitle className="sr-only">{dict.list.form.createTitle}</DialogTitle>
          {activeComposer === "createAction" ? (
            <UserForm
              description={dict.list.form.createDescription}
              isSubmitting={actions.createAction.isSubmitting}
              mode="create"
              rolesList={rolesState.items}
              onSubmit={async (payload) => {
                const result = await actions.createAction.submit(payload);

                if (result) {
                  setActiveComposer(null);
                }
              }}
              submitLabel={dict.list.form.createBtn}
              title={dict.list.form.createTitle}
              dict={dict.form}
            />
          ) : null}
        </DialogContent>
      </Dialog>
      <UsersTable
        items={listState.items}
        dict={dict.table}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(lang, "users", String(item.id ?? ""))}
            >
              {dict.list.actions.view}
            </Link>
            <AdminConfirmDialog
              confirmLabel={dict.list.actions.activate}
              description={dict.list.actions.activateDesc}
              isPending={actions.activateAction.isSubmitting}
              onConfirm={async () => {
                await actions.activateAction.submit(String(item.id ?? ""));
              }}
              title={dict.list.actions.activateTitle}
              triggerLabel={dict.list.actions.activate}
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel={dict.list.actions.suspend}
              description={dict.list.actions.suspendDesc}
              isPending={actions.suspendAction.isSubmitting}
              onConfirm={async () => {
                await actions.suspendAction.submit({
                  userId: String(item.id ?? ""),
                });
              }}
              title={dict.list.actions.suspendTitle}
              triggerLabel={dict.list.actions.suspend}
              variant="danger"
            />
          </div>
        )}
      />
      <AdminPagination
        currentPage={Number(filters.page) || 1}
        lastPage={Number(listState.meta?.lastPage) || 0}
        perPage={Number(filters.perPage) || 15}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onPerPageChange={(perPage) =>
          setFilters({ ...filters, perPage, page: 1 })
        }
      />
    </div>
  );
}
