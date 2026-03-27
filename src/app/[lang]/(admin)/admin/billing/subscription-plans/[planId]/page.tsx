import { SubscriptionPlanDetailsPage } from "@/features/admin/billing/subscription-plans";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; planId: string }>;
}) {
  const { lang, planId } = await params;

  return <SubscriptionPlanDetailsPage planId={planId} lang={lang} />;
}
