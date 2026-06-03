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
  productRevisionRejectActionSchema,
  type ProductRevisionApproveActionValues,
  type ProductRevisionRejectActionValues,
} from "../schemas/product-revision-action.schema";

const approveFields: AdminFormField<ProductRevisionApproveActionValues>[] = [
  {
    key: "notes",
    label: "Notes",
    placeholder: "Optional approval note for the seller or audit trail.",
    type: "textarea",
  },
];

const rejectFields: AdminFormField<ProductRevisionRejectActionValues>[] = [
  {
    key: "reason",
    label: "Reason",
    placeholder: "Explain why this revision cannot be approved.",
    type: "textarea",
  },
  {
    key: "notes",
    label: "Notes",
    placeholder: "Optional internal note.",
    type: "textarea",
  },
];

export function ProductRevisionsListPage({ lang }: { lang: string }) {
  const listState = useProductRevisionsList();
  const actions = useProductRevisionActions(async () => {
    await listState.reload();
  });

  const actionError = actions.approveAction.error ?? actions.rejectAction.error;

  if (listState.isLoading && !listState.items.length && !listState.error) {
    return <PageLoading label="Loading pending product revisions..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <Button variant="secondary" onClick={() => void listState.reload()}>
            Reload
          </Button>
        }
        description="Review seller-submitted product changes that are waiting for an admin decision."
        eyebrow="Admin"
        title="Product Revisions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Pending revisions currently loaded from the API response."
          label="Pending"
          value={listState.total}
        />
      </div>
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {actionError ? (
        <AdminSection title="Action error">
          <p className="text-sm text-rose-600">{actionError}</p>
        </AdminSection>
      ) : null}

      <ProductRevisionsTable
        items={listState.items}
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
              View
            </Link>
            <AdminActionDialog
              confirmLabel="Approve"
              description="Optionally add review notes before approving this product revision."
              fields={approveFields}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  revisionId: String(item.revisionId || item.id || ""),
                  payload,
                })
              }
              schema={productRevisionApproveActionSchema}
              title="Approve Product Revision"
              triggerLabel="Approve"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Reject"
              description="Provide the required rejection reason before sending the decision."
              fields={rejectFields}
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  revisionId: String(item.revisionId || item.id || ""),
                  payload,
                })
              }
              schema={productRevisionRejectActionSchema}
              title="Reject Product Revision"
              triggerLabel="Reject"
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
