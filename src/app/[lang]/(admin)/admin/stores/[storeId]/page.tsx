import { StoreDetailsPage } from "@/features/admin/stores";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; storeId: string }>;
}) {
  const { lang, storeId } = await params;

  return <StoreDetailsPage storeId={storeId} lang={lang} />;
}
