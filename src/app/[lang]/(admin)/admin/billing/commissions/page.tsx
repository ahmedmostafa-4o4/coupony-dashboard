import { CommissionsListPage } from "@/features/admin/billing/commissions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <CommissionsListPage lang={lang} />;
}
