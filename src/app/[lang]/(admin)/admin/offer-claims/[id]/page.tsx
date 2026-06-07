import { OfferClaimDetailsPage } from "@/features/admin/offer-claims";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  return <OfferClaimDetailsPage lang={lang} id={id} />;
}
