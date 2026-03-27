import { InvoiceDetailsPage } from "@/features/admin/billing/invoices";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; invoiceId: string }>;
}) {
  const { lang, invoiceId } = await params;

  return <InvoiceDetailsPage invoiceId={invoiceId} lang={lang} />;
}
