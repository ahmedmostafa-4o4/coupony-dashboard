import { CommissionDetailsPage } from "@/features/admin/billing/commissions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; commissionId: string }>;
}) {
  const { lang, commissionId } = await params;

  return <CommissionDetailsPage commissionId={commissionId} lang={lang} />;
}
