import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminCreateStoreCategoryDto,
  AdminStoreCategoriesQueryDto,
  AdminUpdateStoreCategoryDto,
  StoreCategoryDto,
} from "./store-categories.dto";

export type StoreCategory = Camelized<StoreCategoryDto>;
export type StoreCategoriesListFilters = Camelized<AdminStoreCategoriesQueryDto> & {
  search?: string;
  status?: string;
};
export type StoreCategoriesListResult = AdminListResult<StoreCategory>;
export type StoreCategoryDetailsResult = AdminItemResult<StoreCategory>;
export type CreateStoreCategoryRequest = AdminCreateStoreCategoryDto;
export type UpdateStoreCategoryRequest = AdminUpdateStoreCategoryDto;
