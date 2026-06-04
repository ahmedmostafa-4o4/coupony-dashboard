import { AdminImagePreview } from "@/features/admin/shared";
import type { ProductsDictionary } from "../utils/get-dictionary";

import type { ProductImage } from "../types/product.types";

export function ProductImagesGallery({
  images,
  title,
  dict,
}: {
  images?: ProductImage[];
  title?: string | null;
  dict: ProductsDictionary["revisionPayload"];
}) {
  if (!images?.length) {
    return (
      <AdminImagePreview
        alt={`${title ?? dict.imgAlt} image`}
        className="h-44 w-full max-w-sm"
        fallbackLabel={dict.noImages}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image, index) => (
        <div key={`${image.id ?? image.url ?? image.path ?? index}`} className="space-y-2">
          <AdminImagePreview
            alt={`${title ?? dict.imgAlt} image ${index + 1}`}
            className="w-full h-auto aspect-square object-contain bg-slate-50 p-2"
            src={image.url ?? image.path}
          />
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500 break-all">
            <p className="font-medium text-slate-700">{image.alt ?? dict.noAltText}</p>
            <p className="mt-1 opacity-70">{image.url ?? image.path ?? dict.noUrl}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

