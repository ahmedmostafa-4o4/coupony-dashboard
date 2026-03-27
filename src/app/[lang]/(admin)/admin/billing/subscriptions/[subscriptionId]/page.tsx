import { SubscriptionDetailsPage } from "@/features/admin/billing/subscriptions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; subscriptionId: string }>;
}) {
  const { lang, subscriptionId } = await params;

  return <SubscriptionDetailsPage subscriptionId={subscriptionId} lang={lang} />;
}
