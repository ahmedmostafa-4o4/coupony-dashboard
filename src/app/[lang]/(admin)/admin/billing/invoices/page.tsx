import { InvoicesListPage } from "@/features/admin/billing/invoices";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <InvoicesListPage lang={lang} />;
}
