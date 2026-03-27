import { CategoryDetailsPage } from "@/features/admin/categories";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; categoryId: string }>;
}) {
  const { lang, categoryId } = await params;

  return <CategoryDetailsPage categoryId={categoryId} lang={lang} />;
}
