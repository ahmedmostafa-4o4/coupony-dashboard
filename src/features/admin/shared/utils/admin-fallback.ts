import { toAdminItemResult } from "@/lib/api/admin-contract";

export function resolveItemFromCollectionFallback<TItem>({
  getItemId,
  items,
  requestedId,
  raw,
}: {
  getItemId: (item: TItem) => string | null | undefined;
  items: TItem[];
  requestedId: string;
  raw: unknown;
}) {
  // TODO: Replace this list fallback with a dedicated GET by id endpoint when the backend exposes one.
  const item =
    items.find((entry) => String(getItemId(entry) ?? "") === requestedId) ?? null;

  return toAdminItemResult(item, raw);
}
