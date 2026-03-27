import { InventoryTransactionsListPage } from "@/features/admin/billing/inventory";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <InventoryTransactionsListPage lang={lang} />;
}
