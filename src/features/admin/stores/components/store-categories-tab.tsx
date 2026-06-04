"use client";

import { Tags, Tag } from "lucide-react";
import { AdminSection } from "@/features/admin/shared";
import type { StoreCategorySummary } from "../types/store.types";
import { useStoreCategoriesActions } from "../hooks/use-store-categories-actions";
import { StoreCategoriesDialog } from "./store-categories-dialog";
import { AdminConfirmDialog } from "@/features/admin/shared/components/admin-confirm-dialog";

import type { StoresDictionary } from "../utils/get-dictionary";

export function StoreCategoriesTab({
  storeId,
  categories,
  onReload,
  dict,
}: {
  storeId: string;
  categories?: StoreCategorySummary[];
  onReload: () => Promise<void>;
  dict: StoresDictionary["details"]["categories"];
}) {
  const actions = useStoreCategoriesActions(storeId, onReload);

  const headerActions = (
    <div className="flex items-center justify-end">
      <StoreCategoriesDialog
        currentCategoryIds={categories?.map((c) => c.id) || []}
        isPending={actions.isAttaching !== null}
        onAttach={actions.handleAttach}
        dict={dict}
      />
    </div>
  );

  if (!categories?.length) {
    return (
      <div className="space-y-6">
        {headerActions}
        <AdminSection description={dict.desc} title={dict.title}>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Tags className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">{dict.none}</h3>
          </div>
        </AdminSection>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {headerActions}
      <AdminSection description={dict.desc} title={dict.title}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, i) => (
            <div
              key={category.id || i}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md overflow-hidden"
            >
              <div className="flex items-center space-x-3 p-4">
                <div className="flex h-10 w-10 shrink-0 overflow-hidden items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  {category.iconUrl ? (
                    <img src={category.iconUrl} alt={category.name ?? "Category Icon"} className="h-full w-full object-cover" />
                  ) : (
                    <Tag className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-slate-900" title={category.name}>
                    {category.name || "Unnamed Category"}
                  </h3>
                  <div className="mt-1 flex">
                    {category.isActive ? (
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-inset ring-slate-500/20">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50 px-4 py-2">
                <AdminConfirmDialog
                  title={dict.detachTitle}
                  description={dict.detachDesc}
                  confirmLabel={dict.detach}
                  triggerLabel={dict.detach}
                  variant="danger"
                  isPending={actions.isDetaching === category.id}
                  onConfirm={async () => { await actions.handleDetach(category.id); }}
                />
              </div>
            </div>
          ))}
        </div>
      </AdminSection>
    </div>
  );
}
