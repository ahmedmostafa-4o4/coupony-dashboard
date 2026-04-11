import { cn } from "@/lib/utils/cn";

export function AdminImagePreview({
  alt,
  className,
  fallbackLabel = "No image",
  src,
}: {
  alt: string;
  className?: string;
  fallbackLabel?: string;
  src?: string | null;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-xs font-medium text-slate-400",
          className
        )}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn(
        "rounded-xl border border-slate-200 bg-white object-cover",
        className
      )}
      src={src}
    />
  );
}
