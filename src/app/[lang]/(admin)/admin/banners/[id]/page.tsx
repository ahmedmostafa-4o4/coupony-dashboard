import { BannerDetailsPage } from "@/features/admin/banners/views/banner-details-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const resolvedParams = await params;
  return (
    <BannerDetailsPage
      lang={resolvedParams.lang}
      bannerId={resolvedParams.id}
    />
  );
}
