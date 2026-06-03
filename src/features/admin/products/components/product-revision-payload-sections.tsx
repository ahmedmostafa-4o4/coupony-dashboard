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

function summarizeValue(value: unknown) {
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
    return value ? "Yes" : "No";
  }

  return String(value);
}

export function ProductRevisionPayloadSections({
  revision,
}: {
  revision: ProductRevision;
}) {
  const productEntries =
    revision.product && isRecord(revision.product)
      ? Object.entries(revision.product)
      : [];
  const variants = toVariants(revision.variants);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Product payload</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productEntries.length ? (
            productEntries.map(([key, value]) => (
              <div
                key={key}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {key}
                </p>
                <p className="mt-2 text-sm text-slate-700">{summarizeValue(value)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No product payload overview returned.
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Categories</p>
        <ProductCategoriesList categories={toCategories(revision.categories)} />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Images</p>
        <ProductImagesGallery
          images={toImages(revision.images)}
          title={revision.productTitle}
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Variants</p>
        {variants.length ? (
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
                    <tr key={`${variant.id ?? variant.sku ?? index}`}>
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
        ) : (
          <p className="text-sm text-slate-500">
            No variants included in this revision.
          </p>
        )}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Offer</p>
        <ProductOfferCard offer={isRecord(revision.offer) ? revision.offer : null} />
      </div>
    </div>
  );
}
