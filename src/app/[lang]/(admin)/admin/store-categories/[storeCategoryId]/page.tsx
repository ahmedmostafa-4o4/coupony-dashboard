import { StoreCategoryDetailsPage } from "@/features/admin/store-categories";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; storeCategoryId: string }>;
}) {
  const { lang, storeCategoryId } = await params;

  return <StoreCategoryDetailsPage storeCategoryId={storeCategoryId} lang={lang} />;
}
