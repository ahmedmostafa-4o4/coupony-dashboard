"use client";

import Link from "next/link";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminPageHeader,
  AdminSection,
  AdminStatCard,
  createAdminDetailHref,
  type AdminFormField,
} from "@/features/admin/shared";
import { Button } from "@/components/ui/button";

import { ProductRevisionsTable } from "../components/product-revisions-table";
import { useProductRevisionActions } from "../hooks/use-product-revision-actions";
import { useProductRevisionsList } from "../hooks/use-product-revisions-list";
import {
  productRevisionApproveActionSchema,
  type ProductRevisionApproveActionValues,
} from "../schemas/product-revision-action.schema";
import { ProductRevisionRejectDialog } from "../components/product-revision-reject-dialog";
import { getProductsDictionary } from "../utils/get-dictionary";

export function ProductRevisionsListPage({ lang }: { lang: string }) {
  const listState = useProductRevisionsList();
  const dict = getProductsDictionary(lang);

  const approveFields: AdminFormField<ProductRevisionApproveActionValues>[] = [
    {
      key: "notes",
      label: dict.list.actions.notes,
      placeholder: dict.list.actions.notesListPlaceholder,
      type: "textarea",
    },
  ];

  const actions = useProductRevisionActions(async () => {
    await listState.reload();
  });

  const actionError = actions.approveAction.error ?? actions.rejectAction.error;

  if (listState.isLoading && !listState.items.length && !listState.error) {
    return <PageLoading label={dict.revisionsList.loading} />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <Button variant="secondary" onClick={() => void listState.reload()}>
            {dict.list.reload}
          </Button>
        }
        description={dict.revisionsList.description}
        eyebrow={dict.list.eyebrow}
        title={dict.revisionsList.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint={dict.revisionsList.stats.pendingHint}
          label={dict.revisionsList.stats.pending}
          value={listState.total}
        />
      </div>
      {listState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {actionError ? (
        <AdminSection title={dict.list.errors.action}>
          <p className="text-sm text-rose-600">{actionError}</p>
        </AdminSection>
      ) : null}

      <ProductRevisionsTable
        items={listState.items}
        dict={dict.revisionsTable}
        statusDict={dict.status}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "productRevisions",
                String(item.revisionId || item.id || "")
              )}
            >
              {dict.list.actions.view}
            </Link>
            <AdminActionDialog
              confirmLabel={dict.list.actions.approve}
              description={dict.list.actions.approveDesc}
              fields={approveFields}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  revisionId: String(item.revisionId || item.id || ""),
                  payload,
                })
              }
              schema={productRevisionApproveActionSchema}
              title={dict.list.actions.approveTitle}
              triggerLabel={dict.list.actions.approve}
              variant="primary"
            />
            <ProductRevisionRejectDialog
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  revisionId: String(item.revisionId || item.id || ""),
                  payload,
                })
              }
              triggerLabel={dict.list.actions.reject}
              revision={item}
              dict={dict.rejectDialog}
            />
          </div>
        )}
      />
    </div>
  );
}

