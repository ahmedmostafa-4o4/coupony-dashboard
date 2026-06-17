import { SubscriptionDetailsPage } from "@/features/admin/billing/subscriptions";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; subscriptionId: string }>;
}) {
  const { lang, subscriptionId } = await params;

  const dict = await getGlobalDictionary(lang);

  return <SubscriptionDetailsPage subscriptionId={subscriptionId} lang={lang} dict={dict} />;
}
