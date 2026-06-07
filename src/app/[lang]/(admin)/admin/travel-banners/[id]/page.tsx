import { TravelBannerDetailsPage } from "@/features/admin/travel-banners/views/travel-banner-details-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const resolvedParams = await params;
  return <TravelBannerDetailsPage lang={resolvedParams.lang} id={resolvedParams.id} />;
}
