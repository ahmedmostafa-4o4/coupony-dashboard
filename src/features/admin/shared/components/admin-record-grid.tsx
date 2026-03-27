import {
  formatAdminValue,
  humanizeKey,
} from "@/features/admin/shared/utils/admin-formatters";
import { getObjectEntries } from "@/features/admin/shared/utils/admin-data";

export function AdminRecordGrid({ value }: { value: unknown }) {
  const entries = getObjectEntries(value);

  if (!entries.length) {
    return <p className="text-sm text-slate-500">No structured data returned.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map(([key, entryValue]) => (
        <div
          key={key}
          className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {humanizeKey(key)}
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
            {formatAdminValue(entryValue)}
          </pre>
        </div>
      ))}
    </div>
  );
}
