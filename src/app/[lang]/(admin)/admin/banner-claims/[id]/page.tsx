import { BannerClaimDetailsPage } from "@/features/admin/banner-claims";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  return <BannerClaimDetailsPage lang={lang} id={id} />;
}
