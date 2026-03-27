import { StoreCategoriesListPage } from "@/features/admin/store-categories";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <StoreCategoriesListPage lang={lang} />;
}
