function summarizeValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    return `${value.length} item${value.length === 1 ? "" : "s"}`;
  }

  if (typeof value === "object") {
    return `${Object.keys(value as Record<string, unknown>).length} fields`;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

export function ProductOfferCard({
  offer,
}: {
  offer?: Record<string, unknown> | null;
}) {
  if (!offer) {
    return <p className="text-sm text-slate-500">No offer payload returned.</p>;
  }

  const entries = Object.entries(offer);

  if (!entries.length) {
    return <p className="text-sm text-slate-500">No offer payload returned.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {key}
          </p>
          <p className="mt-2 text-sm text-slate-700">{summarizeValue(value)}</p>
        </div>
      ))}
    </div>
  );
}
