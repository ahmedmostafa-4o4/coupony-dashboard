import { SubscriptionPlansListPage } from "@/features/admin/billing/subscription-plans";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <SubscriptionPlansListPage lang={lang} />;
}
