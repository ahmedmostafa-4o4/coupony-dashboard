import type { AdminColumn } from "@/features/admin/shared/types/admin-common.types";
import {
  formatAdminCurrency,
  formatAdminDate,
} from "@/features/admin/shared/utils/admin-formatters";

export function textColumn<TData>(
  id: string,
  header: string,
  accessorKey: keyof TData | string
): AdminColumn<TData> {
  return {
    id,
    header,
    accessorKey,
  };
}

export function dateColumn<TData>(
  id: string,
  header: string,
  accessorKey: keyof TData | string
): AdminColumn<TData> {
  return {
    id,
    header,
    accessorKey,
    cell: (item) => formatAdminDate(readValue(item, accessorKey)),
  };
}

export function currencyColumn<TData>(
  id: string,
  header: string,
  accessorKey: keyof TData | string,
  currency = "USD"
): AdminColumn<TData> {
  return {
    id,
    header,
    accessorKey,
    cell: (item) => formatAdminCurrency(readValue(item, accessorKey), currency),
  };
}

function readValue<TData>(item: TData, accessorKey: keyof TData | string) {
  return String(accessorKey)
    .split(".")
    .reduce<unknown>((currentValue, currentKey) => {
      if (!currentValue || typeof currentValue !== "object") {
        return undefined;
      }

      return (currentValue as Record<string, unknown>)[currentKey];
    }, item as unknown);
}
