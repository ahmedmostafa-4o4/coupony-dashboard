import { SubscriptionPlanDetailsPage } from "@/features/admin/billing/subscription-plans";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; planId: string }>;
}) {
  const { lang, planId } = await params;
  const dict = await getGlobalDictionary(lang);

  return <SubscriptionPlanDetailsPage planId={planId} lang={lang} dict={dict} />;
}
