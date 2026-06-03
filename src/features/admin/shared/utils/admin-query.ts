import { toAdminQuery } from "@/features/admin/shared/utils/admin-filters";
import { decamelizeKeys } from "@/lib/utils/case";

export function buildAdminQuery<TFilters extends Record<string, unknown>>(
  filters: TFilters,
  searchKey?: string
) {
  const { search, ...rest } = filters;

  const query = toAdminQuery({
    ...(rest as Record<string, string>),
    ...(searchKey && typeof search === "string"
      ? { [searchKey]: search }
      : {}),
  });

  return decamelizeKeys(query) as Record<string, string | number | boolean | null | undefined>;
}
