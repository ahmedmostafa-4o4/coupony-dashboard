import { PaymentsListPage } from "@/features/admin/billing/payments";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <PaymentsListPage lang={lang} />;
}
