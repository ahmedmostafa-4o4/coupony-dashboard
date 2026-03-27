function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function normalizeCollectionPayload<TData>(payload: unknown) {
  if (Array.isArray(payload)) {
    return {
      items: payload as TData[],
      total: payload.length,
      meta: undefined,
      raw: payload,
    };
  }

  if (isRecord(payload)) {
    const items =
      (Array.isArray(payload.data) && payload.data) ||
      (Array.isArray(payload.items) && payload.items) ||
      (Array.isArray(payload.results) && payload.results) ||
      (Array.isArray(payload.rows) && payload.rows) ||
      [];

    const meta =
      (isRecord(payload.meta) && payload.meta) ||
      (isRecord(payload.pagination) && payload.pagination) ||
      undefined;

    const total =
      (typeof payload.total === "number" && payload.total) ||
      (meta && typeof meta.total === "number" ? meta.total : items.length);

    return {
      items: items as TData[],
      total,
      meta,
      raw: ("raw" in payload && payload.raw) || payload,
    };
  }

  return {
    items: [] as TData[],
    total: 0,
    meta: undefined,
    raw: payload,
  };
}

export function normalizeEntityPayload<TData>(payload: unknown) {
  if (isRecord(payload)) {
    if ("data" in payload && payload.data) {
      return payload.data as TData;
    }

    if ("item" in payload && payload.item) {
      return payload.item as TData;
    }

    if ("result" in payload && payload.result) {
      return payload.result as TData;
    }
  }

  return (payload ?? null) as TData | null;
}

export function getPayloadRaw(payload: unknown) {
  if (isRecord(payload) && "raw" in payload && payload.raw) {
    return payload.raw;
  }

  return payload;
}

export function getObjectEntries(value: unknown) {
  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value);
}
