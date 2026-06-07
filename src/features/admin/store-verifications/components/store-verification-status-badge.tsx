import { cn } from "@/lib/utils/cn";
import type { VerificationStatus } from "@/types/admin-api.dto";
import type { StoreVerificationsDictionary } from "../utils/get-dictionary";

export function StoreVerificationStatusBadge({ 
  value,
  dict,
}: { 
  value?: VerificationStatus | string;
  dict: StoreVerificationsDictionary;
}) {
  const configMap: Record<string, { label: string; className: string }> = {
    pending: { label: dict.status.pending, className: "bg-slate-100 text-slate-800" },
    approved: { label: dict.status.approved, className: "bg-emerald-100 text-emerald-800" },
    rejected: { label: dict.status.rejected, className: "bg-rose-100 text-rose-800" },
  };

  const config = value ? configMap[value] : null;

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        config?.className || "bg-slate-100 text-slate-800"
      )}
    >
      {config?.label || dict.status.unknown}
    </span>
  );
}
