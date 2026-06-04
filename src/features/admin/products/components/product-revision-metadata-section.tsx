import type { ProductsDictionary } from "../utils/get-dictionary";
import type { ProductRevision } from "../types/product-revision.types";

export function ProductRevisionMetadataSection({
  revision,
  dict,
}: {
  revision: ProductRevision;
  dict: ProductsDictionary["revisionMetadata"];
}) {
  const items = [
    { label: dict.revisionId, value: revision.revisionId },
    { label: dict.productId, value: revision.productId },
    { label: dict.store, value: revision.storeName },
    { label: dict.submitted, value: revision.submittedAtLabel },
    { label: dict.images, value: revision.imagesCount ?? 0 },
    { label: dict.variants, value: revision.variantsCount ?? 0 },
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

