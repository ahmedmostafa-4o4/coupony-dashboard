import type { ProductCategory } from "../types/product.types";

export function ProductCategoriesList({
  categories,
}: {
  categories?: ProductCategory[];
}) {
  if (!categories?.length) {
    return <p className="text-sm text-slate-500">No categories returned.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <span
          key={`${category.id ?? category.name ?? "category"}-${index}`}
          className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
        >
          {category.name ?? category.id ?? "Unnamed category"}
        </span>
      ))}
    </div>
  );
}
