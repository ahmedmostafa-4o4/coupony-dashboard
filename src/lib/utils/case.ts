function toCamelCase(value: string) {
  return value.replace(/_([a-z])/g, (_, character: string) =>
    character.toUpperCase()
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function camelizeKeys<TValue>(value: TValue): TValue {
  if (Array.isArray(value)) {
    return value.map((entry) => camelizeKeys(entry)) as TValue;
  }

  if (!isPlainObject(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [
      toCamelCase(key),
      camelizeKeys(entryValue),
    ])
  ) as TValue;
}
