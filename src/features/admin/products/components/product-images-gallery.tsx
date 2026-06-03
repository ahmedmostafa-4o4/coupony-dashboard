import { AdminImagePreview } from "@/features/admin/shared";

import type { ProductImage } from "../types/product.types";

export function ProductImagesGallery({
  images,
  title,
}: {
  images?: ProductImage[];
  title?: string | null;
}) {
  if (!images?.length) {
    return (
      <AdminImagePreview
        alt={`${title ?? "Product"} image`}
        className="h-44 w-full max-w-sm"
        fallbackLabel="No images returned"
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image, index) => (
        <div key={`${image.id ?? image.url ?? image.path ?? index}`} className="space-y-2">
          <AdminImagePreview
            alt={`${title ?? "Product"} image ${index + 1}`}
            className="h-44 w-full"
            src={image.url ?? image.path}
          />
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <p>{image.alt ?? "No alt text"}</p>
            <p>{image.url ?? image.path ?? "No URL"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
