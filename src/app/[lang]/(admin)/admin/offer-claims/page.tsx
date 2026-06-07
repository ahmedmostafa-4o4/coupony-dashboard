import { OfferClaimsListPage } from "@/features/admin/offer-claims";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <OfferClaimsListPage lang={lang} />;
}
