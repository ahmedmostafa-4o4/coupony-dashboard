import { AdminImagePreview, AdminSection } from "@/features/admin/shared";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function collectImageUrls(value: unknown): string[] {
  if (typeof value === "string") {
    return value ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectImageUrls(item));
  }

  if (!isRecord(value)) {
    return [];
  }

  const directUrl = [
    value.url,
    value.imageUrl,
    value.src,
    value.path,
    value.thumbnailUrl,
  ].find((entry) => typeof entry === "string" && entry.length > 0);

  if (typeof directUrl === "string") {
    return [directUrl];
  }

  return Object.values(value).flatMap((entry) => collectImageUrls(entry));
}

export function ProductRevisionImages({
  value,
}: {
  value: unknown;
}) {
  const imageUrls = Array.from(new Set(collectImageUrls(value)));

  if (!imageUrls.length) {
    return null;
  }

  return (
    <AdminSection
      title="Images"
      description="Image assets extracted from the revision payload when URLs are present."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {imageUrls.map((url, index) => (
          <AdminImagePreview
            key={`${url}-${index}`}
            alt={`Product revision image ${index + 1}`}
            className="h-48 w-full"
            src={url}
          />
        ))}
      </div>
    </AdminSection>
  );
}
