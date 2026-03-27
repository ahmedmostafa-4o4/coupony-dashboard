import { CouponDetailsPage } from "@/features/admin/coupons";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; couponId: string }>;
}) {
  const { lang, couponId } = await params;

  return <CouponDetailsPage couponId={couponId} lang={lang} />;
}
