import { SubscriptionsListPage } from "@/features/admin/billing/subscriptions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <SubscriptionsListPage lang={lang} />;
}
