import { useAdminCollection } from "@/features/admin/shared";
import { getSelectableProducts } from "../api/get-selectable-products";
import type { SelectableProduct, SelectableProductsFilters } from "../types/travel-banner.types";

export function useSelectableProducts(filters: SelectableProductsFilters, enabled = true) {
  return useAdminCollection<SelectableProduct, SelectableProductsFilters>({
    filters,
    getItems: getSelectableProducts,
    enabled,
  });
}
