import { toAdminQuery } from "@/features/admin/shared/utils/admin-filters";

export function buildAdminQuery<TFilters extends Record<string, unknown>>(
  filters: TFilters,
  searchKey?: string
) {
  const { search, ...rest } = filters;

  return toAdminQuery({
    ...(rest as Record<string, string>),
    ...(searchKey && typeof search === "string"
      ? { [searchKey]: search }
      : {}),
  });
}
