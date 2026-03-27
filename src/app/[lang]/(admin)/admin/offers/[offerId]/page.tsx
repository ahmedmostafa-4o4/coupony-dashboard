import { OfferDetailsPage } from "@/features/admin/offers";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; offerId: string }>;
}) {
  const { lang, offerId } = await params;

  return <OfferDetailsPage offerId={offerId} lang={lang} />;
}
