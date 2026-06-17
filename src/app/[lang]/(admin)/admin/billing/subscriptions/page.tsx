import { SubscriptionsListPage } from "@/features/admin/billing/subscriptions";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const dict = await getGlobalDictionary(lang);

  return <SubscriptionsListPage lang={lang} dict={dict} />;
}
