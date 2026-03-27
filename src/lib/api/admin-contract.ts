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

type AdminListEnvelope<TDto> = ApiSuccessResponse<PaginatedResultDto<TDto> | TDto[]> & {
  meta?: Record<string, unknown>;
  pagination?: Record<string, unknown>;
};

export function mapPaginatedResponse<TDto, TItem = Camelized<TDto>>(
  response: AdminListEnvelope<TDto>,
  mapItem?: (item: Camelized<TDto>) => TItem
): AdminListResult<TItem> {
  const rawResponse = camelizeKeys(response) as {
    data: Camelized<PaginatedResultDto<TDto>> | Camelized<TDto>[];
    meta?: Record<string, unknown>;
    pagination?: Record<string, unknown>;
  };
  const data = rawResponse.data;
  const rawItems = Array.isArray(data) ? data : (data.items ?? []);
  const meta = Array.isArray(data)
    ? (rawResponse.meta ?? rawResponse.pagination ?? {})
    : ((data.pagination as Record<string, unknown> | undefined) ??
      rawResponse.meta ??
      rawResponse.pagination ??
      {});
  const items = rawItems.map((item) => (mapItem ? mapItem(item) : (item as TItem)));
  const total = typeof meta.total === "number" ? meta.total : items.length;

  return {
    items,
    meta,
    raw: response,
    total,
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
