import { cn } from "@/lib/utils/cn";
import {
  formatStatusLabel,
  getStatusTone,
} from "@/features/admin/shared/utils/admin-formatters";

const toneClasses = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-rose-100 text-rose-700",
  info: "bg-sky-100 text-sky-700",
};

export function AdminStatusBadge({ value }: { value: unknown }) {
  const tone = getStatusTone(value);

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone]
      )}
    >
      {formatStatusLabel(value)}
    </span>
  );
}
