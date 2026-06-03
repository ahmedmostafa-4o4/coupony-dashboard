import { ProductRevisionDetailsPage } from "@/features/admin/products";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; revisionId: string }>;
}) {
  const { lang, revisionId } = await params;

  return (
    <ProductRevisionDetailsPage revisionId={revisionId} lang={lang} />
  );
}
