"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { AdminPageHeader, AdminConfirmDialog, createAdminHref, AdminSection, AdminStatusBadge, formatAdminDate } from "@/features/admin/shared";
import { PageLoading } from "@/components/shared/page-loading";
import { getTravelBannersDictionary } from "../utils/get-dictionary";
import { TravelBannerForm } from "../components/travel-banner-form";
import { useTravelBannerDetails } from "../hooks/use-travel-banner-details";
import { useTravelBannerActions } from "../hooks/use-travel-banner-actions";
import { travelBannerUpdateAdminSchema } from "../schemas/travel-banner.schema";

export function TravelBannerDetailsPage({
  lang,
  id,
}: {
  lang: string;
  id: string;
}) {
  const dict = getTravelBannersDictionary(lang);
  const router = useRouter();

  const details = useTravelBannerDetails(id);

  const actions = useTravelBannerActions(() => {
    void details.reload();
  });

  if (details.isLoading) {
    return <PageLoading label="Loading details..." />;
  }

  if (details.error || !details.item) {
    return (
      <div className="rounded-lg bg-rose-50 p-4 text-sm text-rose-600">
        {details.error || "Banner not found"}
      </div>
    );
  }

  const banner = details.item;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.details.title}
        description={dict.details.description}
        actions={
          <AdminConfirmDialog
            confirmLabel={dict.details.delete}
            description="Are you sure you want to delete this travel banner? This action cannot be undone."
            isPending={actions.deleteAction.isSubmitting}
            onConfirm={async () => {
              await actions.deleteAction.submit(String(banner.id));
              router.push(createAdminHref(lang, "travelBanners" as any));
            }}
            title={dict.details.delete}
            triggerLabel={dict.details.delete}
            variant="danger"
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side: Summary & Preview */}
        <div className="space-y-6 lg:col-span-1">
          <AdminSection title={dict.details.eyebrow}>
            <div className="space-y-4">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-slate-200">
                {banner.imageUrl ? (
                  <Image src={banner.imageUrl.startsWith('http') ? banner.imageUrl : `https://api.coupony.shop/storage/${banner.imageUrl}`} alt={banner.ctaText} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">{dict.table.columns.status}</dt>
                    <dd>
                      <AdminStatusBadge value={banner.isActive ? "active" : "inactive"} />
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">{dict.form.priority}</dt>
                    <dd className="font-medium text-slate-900">{banner.priority}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">{dict.form.startDate}</dt>
                    <dd className="font-medium text-slate-900">{banner.startDate ? formatAdminDate(banner.startDate) : "N/A"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">{dict.form.endDate}</dt>
                    <dd className="font-medium text-slate-900">{banner.endDate ? formatAdminDate(banner.endDate) : "N/A"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </AdminSection>
        </div>

        {/* Right Side: Edit Form */}
        <div className="lg:col-span-2">
          <AdminSection title={dict.details.edit}>
            <TravelBannerForm
              defaultValues={{
                cta_text: banner.ctaText,
                save_percent: banner.savePercent,
                priority: String(banner.priority),
                start_date: banner.startDate ? banner.startDate.slice(0, 16) : "",
                end_date: banner.endDate ? banner.endDate.slice(0, 16) : "",
                is_active: banner.isActive,
                image: null,
              }}
              schema={travelBannerUpdateAdminSchema}
              onSubmit={async (values) => {
                await actions.updateAction.submit({ id: banner.id, payload: values });
              }}
              isPending={actions.updateAction.isSubmitting}
              dict={dict as any}
              initialProduct={banner.product as any}
            />
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
