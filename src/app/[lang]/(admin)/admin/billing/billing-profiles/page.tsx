import { BillingProfilesListPage } from "@/features/admin/billing/billing-profiles";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <BillingProfilesListPage lang={lang} />;
}
