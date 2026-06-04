function renderValue(value: unknown, yesLabel = "Yes", noLabel = "No") {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? yesLabel : noLabel;
  }

  return String(value);
}

export function ProductMetadataSection({
  items,
  dict,
}: {
  items: Array<{ label: string; value: unknown }>;
  dict?: { yes: string; no: string };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {renderValue(item.value, dict?.yes, dict?.no)}
          </p>
        </div>
      ))}
    </div>
  );
}

