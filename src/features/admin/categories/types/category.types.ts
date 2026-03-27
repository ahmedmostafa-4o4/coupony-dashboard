import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminCategoriesQueryDto,
  AdminCreateCategoryDto,
  AdminUpdateCategoryDto,
  CategoryDto,
} from "./categories.dto";

export type Category = Camelized<CategoryDto>;
export type CategoriesListFilters = Camelized<AdminCategoriesQueryDto> & {
  search?: string;
  status?: string;
};
export type CategoriesListResult = AdminListResult<Category>;
export type CategoryDetailsResult = AdminItemResult<Category>;
export type CreateCategoryRequest = AdminCreateCategoryDto;
export type UpdateCategoryRequest = AdminUpdateCategoryDto;
