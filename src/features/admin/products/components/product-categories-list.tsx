import type { ProductCategory } from "../types/product.types";
import type { ProductsDictionary } from "../utils/get-dictionary";

export function ProductCategoriesList({
  categories,
  dict,
}: {
  categories?: ProductCategory[];
  dict: ProductsDictionary["revisionPayload"];
}) {
  if (!categories?.length) {
    return <p className="text-sm text-slate-500">{dict.noCategories}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <span
          key={`${category.id ?? category.name ?? "category"}-${index}`}
          className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
        >
          {category.name ?? category.id ?? dict.unnamedCategory}
        </span>
      ))}
    </div>
  );
}

