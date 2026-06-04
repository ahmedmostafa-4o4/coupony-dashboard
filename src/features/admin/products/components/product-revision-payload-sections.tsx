import { humanizeKey } from "@/features/admin/shared/utils/admin-formatters";
import type { ProductsDictionary } from "../utils/get-dictionary";
import { ProductCategoriesList } from "./product-categories-list";
import { ProductImagesGallery } from "./product-images-gallery";
import { ProductOfferCard } from "./product-offer-card";

import type { ProductRevision } from "../types/product-revision.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toCategories(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord) as Array<{ id?: string; name?: string }>;
}

function toImages(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord) as Array<{
    id?: string;
    url?: string;
    path?: string;
    alt?: string;
  }>;
}

function toVariants(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord) as Array<{
    id?: string;
    title?: string;
    sku?: string;
    price?: number;
    stock?: number;
  }>;
}

function summarizeValue(value: unknown, yesLabel = "Yes", noLabel = "No") {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    return `${value.length} item${value.length === 1 ? "" : "s"}`;
  }

  if (typeof value === "object") {
    return `${Object.keys(value as Record<string, unknown>).length} fields`;
  }

  if (typeof value === "boolean") {
    return value ? yesLabel : noLabel;
  }

  return String(value);
}

export function ProductRevisionPayloadSections({
  revision,
  dict,
  rejectDict,
}: {
  revision: ProductRevision;
  dict: ProductsDictionary["revisionPayload"];
  rejectDict?: ProductsDictionary["rejectDialog"];
}) {
  const productEntries =
    revision.product && isRecord(revision.product)
      ? Object.entries(revision.product)
      : [];
  const variants = toVariants(revision.variants);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">{dict.productPayload}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productEntries.length ? (
            productEntries.map(([key, value]) => {
              const translatedLabel = rejectDict?.fields[key as keyof typeof rejectDict.fields] || humanizeKey(key);
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {translatedLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{summarizeValue(value, dict.yes, dict.no)}</p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500">
              {dict.noProductPayload}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">{dict.categories}</p>
        <ProductCategoriesList categories={toCategories(revision.categories)} dict={dict} />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">{dict.images}</p>
        <ProductImagesGallery
          images={toImages(revision.images)}
          title={revision.productTitle}
          dict={dict}
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">{dict.variants}</p>
        {variants.length ? (
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
                    <tr key={`${variant.id ?? variant.sku ?? index}`}>
                      <td className="px-4 py-4 text-sm text-slate-700">
                        {variant.title ?? dict.variantTable.unnamedVariant}
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
        ) : (
          <p className="text-sm text-slate-500">
            {dict.noVariants}
          </p>
        )}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">{dict.offer}</p>
        <ProductOfferCard offer={isRecord(revision.offer) ? revision.offer : null} dict={dict} rejectDict={rejectDict} />
      </div>
    </div>
  );
}

