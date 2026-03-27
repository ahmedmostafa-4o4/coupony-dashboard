"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { InvoiceStatusBadge } from "../components/invoice-status-badge";
import { useInvoiceActions } from "../hooks/use-invoice-actions";
import { useInvoiceDetails } from "../hooks/use-invoice-details";

export function InvoiceDetailsPage({
  invoiceId,
  lang,
}: {
  invoiceId: string;
  lang: string;
}) {
  const detailState = useInvoiceDetails(invoiceId);
  void lang;
  const actions = useInvoiceActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading invoice details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Invoice not found">
        <p className="text-sm text-slate-500">
          The backend did not return a invoice for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <InvoiceStatusBadge value={detailState.item.status} />
            
            <AdminConfirmDialog
              confirmLabel="Issue"
              description="This will call the mapped admin endpoint for the selected invoice."
              isPending={actions.issueAction.isSubmitting}
              onConfirm={async () => {
                await actions.issueAction.submit({ invoiceId });
              }}
              title="Issue Invoice"
              triggerLabel="Issue"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Mark paid"
              description="This will call the mapped admin endpoint for the selected invoice."
              isPending={actions.markPaidAction.isSubmitting}
              onConfirm={async () => {
                await actions.markPaidAction.submit({ invoiceId });
              }}
              title="Mark paid Invoice"
              triggerLabel="Mark paid"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Void"
              description="This will call the mapped admin endpoint for the selected invoice."
              isPending={actions.voidAction.isSubmitting}
              onConfirm={async () => {
                await actions.voidAction.submit({ invoiceId });
              }}
              title="Void Invoice"
              triggerLabel="Void"
              variant="danger"
            />
          </div>
        }
        description="Inspect invoice payloads and apply billing workflow actions."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, invoiceId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      
      <AdminSection description="Structured fields returned for this record." title="Invoice details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
