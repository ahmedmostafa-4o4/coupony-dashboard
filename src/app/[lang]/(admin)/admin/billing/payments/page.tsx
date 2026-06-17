import { PaymentsListPage } from "@/features/admin/billing/payments";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getGlobalDictionary(lang);

  return <PaymentsListPage lang={lang} dict={dict} />;
}
