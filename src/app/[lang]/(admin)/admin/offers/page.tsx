import { OffersListPage } from "@/features/admin/offers";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <OffersListPage lang={lang} />;
}
