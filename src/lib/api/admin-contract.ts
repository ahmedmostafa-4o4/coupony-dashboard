import { camelizeKeys } from "@/lib/utils/case";
import type { ApiSuccessResponse, PaginatedResultDto } from "@/types/admin-api.dto";
import type { Camelized } from "@/types/camelize.types";

export interface AdminListResult<TItem> {
  items: TItem[];
  meta?: Record<string, unknown>;
  raw: unknown;
  total: number;
}

export interface AdminItemResult<TItem> {
  item: TItem | null;
  raw: unknown;
}

export function mapPaginatedResponse<TDto, TItem = Camelized<TDto>>(
  response: ApiSuccessResponse<PaginatedResultDto<TDto>>,
  mapItem?: (item: Camelized<TDto>) => TItem
): AdminListResult<TItem> {
  const data = camelizeKeys(response.data) as unknown as Camelized<
    PaginatedResultDto<TDto>
  >;
  const items = data.items.map((item) => (mapItem ? mapItem(item) : (item as TItem)));

  return {
    items,
    meta: data.pagination as Record<string, unknown>,
    raw: response,
    total: data.pagination.total,
  };
}

export function mapSuccessData<TData>(response: ApiSuccessResponse<TData>) {
  return camelizeKeys(response.data) as Camelized<TData>;
}

export function mapItemResponse<TData, TItem>(
  response: ApiSuccessResponse<TData>,
  pickItem: (data: Camelized<TData>) => TItem | null
): AdminItemResult<TItem> {
  const data = mapSuccessData(response);

  return {
    item: pickItem(data),
    raw: response,
  };
}

export function toAdminItemResult<TItem>(
  item: TItem | null,
  raw: unknown
): AdminItemResult<TItem> {
  return {
    item,
    raw,
  };
}

export function toAdminListResult<TItem>(
  items: TItem[],
  raw: unknown,
  meta?: Record<string, unknown>
): AdminListResult<TItem> {
  return {
    items,
    meta,
    raw,
    total:
      typeof meta?.total === "number"
        ? meta.total
        : typeof meta?.perPage === "number" && typeof meta?.page === "number"
          ? items.length
          : items.length,
  };
}
