import { StoreVerificationsListPage } from "@/features/admin/store-verifications";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <StoreVerificationsListPage lang={lang} />;
}
