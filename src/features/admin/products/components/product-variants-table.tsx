import type { ProductVariant } from "../types/product.types";

export function ProductVariantsTable({
  variants,
}: {
  variants?: ProductVariant[];
}) {
  if (!variants?.length) {
    return <p className="text-sm text-slate-500">No variants returned.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                SKU
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {variants.map((variant, index) => (
              <tr key={`${variant.id ?? variant.sku ?? index}`} className="align-top">
                <td className="px-4 py-4 text-sm text-slate-700">
                  {variant.title ?? "Unnamed variant"}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {variant.sku ?? "—"}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {variant.price ?? "—"}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {variant.stock ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
