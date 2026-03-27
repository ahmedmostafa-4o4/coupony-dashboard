import { RedemptionsListPage } from "@/features/admin/redemptions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <RedemptionsListPage lang={lang} />;
}
