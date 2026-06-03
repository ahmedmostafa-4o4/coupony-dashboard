import type { ProductRevision } from "../types/product-revision.types";

export function ProductRevisionMetadataSection({
  revision,
}: {
  revision: ProductRevision;
}) {
  const items = [
    { label: "Revision ID", value: revision.revisionId },
    { label: "Product ID", value: revision.productId },
    { label: "Store", value: revision.storeName },
    { label: "Submitted", value: revision.submittedAtLabel },
    { label: "Images", value: revision.imagesCount ?? 0 },
    { label: "Variants", value: revision.variantsCount ?? 0 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {item.value || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}
