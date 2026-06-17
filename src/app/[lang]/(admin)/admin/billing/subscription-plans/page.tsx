import { SubscriptionPlansListPage } from "@/features/admin/billing/subscription-plans";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getGlobalDictionary(lang);

  return <SubscriptionPlansListPage lang={lang} dict={dict} />;
}
