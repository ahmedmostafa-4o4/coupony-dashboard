import { StoreVerificationDetailsPage } from "@/features/admin/store-verifications";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; verificationId: string }>;
}) {
  const { lang, verificationId } = await params;

  return <StoreVerificationDetailsPage verificationId={verificationId} lang={lang} />;
}
