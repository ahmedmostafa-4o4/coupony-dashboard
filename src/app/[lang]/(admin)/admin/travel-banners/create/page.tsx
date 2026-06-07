import { TravelBannerCreatePage } from "@/features/admin/travel-banners/views/travel-banner-create-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return <TravelBannerCreatePage lang={resolvedParams.lang} />;
}
