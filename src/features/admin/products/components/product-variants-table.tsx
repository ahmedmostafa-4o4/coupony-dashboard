import type { ProductVariant } from "../types/product.types";
import type { ProductsDictionary } from "../utils/get-dictionary";

export function ProductVariantsTable({
  variants,
  dict,
}: {
  variants?: ProductVariant[];
  dict: ProductsDictionary["revisionPayload"];
}) {
  if (!variants?.length) {
    return <p className="text-sm text-slate-500">{dict.noVariants}</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {dict.variantTable.title}
              </th>
              <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {dict.variantTable.sku}
              </th>
              <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {dict.variantTable.price}
              </th>
              <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {dict.variantTable.stock}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {variants.map((variant, index) => (
              <tr key={`${variant.id ?? variant.sku ?? index}`} className="align-top">
                <td className="px-4 py-4 text-sm text-slate-700">
                  {variant.title ?? dict.variantTable.unnamedVariant}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {variant.sku ?? "—"}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {variant.price ? String(variant.price) : variant.originalPrice ? String(variant.originalPrice) : "—"}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {variant.stockQty != null ? String(variant.stockQty) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

