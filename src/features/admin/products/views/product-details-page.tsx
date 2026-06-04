"use client";

import { useRouter } from "next/navigation";

import { PageLoading } from "@/components/shared/page-loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AdminConfirmDialog,
  AdminPageHeader,
  AdminRecordGrid,
  AdminSection,
  createAdminHref,
  getAdminEntityTitle,
} from "@/features/admin/shared";

import { ProductApprovalStatusBadge } from "../components/product-approval-status-badge";
import { ProductCategoriesList } from "../components/product-categories-list";
import { ProductForm } from "../components/product-form";
import { ProductImagesGallery } from "../components/product-images-gallery";
import { ProductMetadataSection } from "../components/product-metadata-section";
import { ProductOfferCard } from "../components/product-offer-card";
import { ProductStatusBadge } from "../components/product-status-badge";
import { ProductSummaryCards } from "../components/product-summary-cards";
import { ProductVariantsTable } from "../components/product-variants-table";
import { useProductActions } from "../hooks/use-product-actions";
import { useProductDetails } from "../hooks/use-product-details";
import { getProductsDictionary } from "../utils/get-dictionary";

export function ProductDetailsPage({
  productId,
  lang,
}: {
  productId: string;
  lang: string;
}) {
  const router = useRouter();
  const detailState = useProductDetails(productId);
  const dict = getProductsDictionary(lang);
  const actions = useProductActions(async () => {
    await detailState.reload();
  });

  if (detailState.isLoading) {
    return <PageLoading label={dict.details.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.details.notFound}>
        <p className="text-sm text-slate-500">
          {dict.details.notFoundDesc}
        </p>
      </AdminSection>
    );
  }

  const product = detailState.item;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <ProductStatusBadge value={product.status} dict={dict.status} />
            <ProductApprovalStatusBadge
              value={product.approvalStatusLabel ?? product.approvalStatus}
              dict={dict.status}
            />
            <AdminConfirmDialog
              confirmLabel={dict.list.actions.delete}
              description={dict.list.actions.deleteDesc}
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                const result = await actions.deleteAction.submit(productId);

                if (result) {
                  router.replace(createAdminHref(lang, "products"));
                }
              }}
              title={dict.list.actions.deleteTitle}
              triggerLabel={dict.list.actions.delete}
              variant="danger"
            />
          </div>
        }
        description={dict.list.description}
        eyebrow={dict.details.eyebrow}
        title={getAdminEntityTitle(product, productId)}
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      {actions.updateAction.error ? (
        <AdminSection title={dict.list.errors.update}>
          <p className="text-sm text-rose-600">{actions.updateAction.error}</p>
        </AdminSection>
      ) : null}
      {actions.deleteAction.error ? (
        <AdminSection title={dict.list.errors.delete}>
          <p className="text-sm text-rose-600">{actions.deleteAction.error}</p>
        </AdminSection>
      ) : null}

      <Tabs defaultValue="overview" className="w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
        <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 p-1">
          <TabsTrigger value="overview">{dict.details.tabs.overview}</TabsTrigger>
          <TabsTrigger value="update">{dict.details.tabs.update}</TabsTrigger>
          <TabsTrigger value="store">{dict.details.tabs.store}</TabsTrigger>
          <TabsTrigger value="categories">{dict.details.tabs.categories}</TabsTrigger>
          <TabsTrigger value="images">{dict.details.tabs.images}</TabsTrigger>
          <TabsTrigger value="variants">{dict.details.tabs.variants}</TabsTrigger>
          <TabsTrigger value="offer">{dict.details.tabs.offer}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <AdminSection
            title={dict.details.overview.title}
            description={dict.details.overview.desc}
          >
            <ProductSummaryCards product={product} dict={dict.revisionOverview} />
          </AdminSection>

          <AdminSection
            title={dict.details.overview.status}
            description={dict.details.overview.statusDesc}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.details.overview.status}
                </p>
                <div className="mt-2">
                  <ProductStatusBadge value={product.status} dict={dict.status} />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.details.overview.approval}
                </p>
                <div className="mt-2">
                  <ProductApprovalStatusBadge
                    value={product.approvalStatusLabel ?? product.approvalStatus}
                    dict={dict.status}
                  />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.details.overview.featured}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {product.featuredLabel ?? dict.productsTable.featuredVal.standard}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {dict.details.overview.currency}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  {product.currency ?? "—"}
                </p>
              </div>
            </div>
          </AdminSection>

          <AdminSection title={dict.details.metadata.title} description={dict.details.metadata.desc}>
            <ProductMetadataSection
              items={[
                { label: dict.details.metadata.productId, value: product.id },
                { label: dict.details.metadata.slug, value: product.slug },
                {
                  label: dict.details.metadata.pendingRevision,
                  value: product.pendingRevision
                    ? dict.details.metadata.pendingRevisionVal.available
                    : dict.details.metadata.pendingRevisionVal.none,
                },
              ]}
              dict={{ yes: dict.revisionPayload.yes, no: dict.revisionPayload.no }}
            />
          </AdminSection>
        </TabsContent>

        <TabsContent value="update" className="mt-0">
          <ProductForm
            description={dict.form.updateDesc}
            initialValues={product}
            isSubmitting={actions.updateAction.isSubmitting}
            mode="update"
            onSubmit={async (payload) => {
              await actions.updateAction.submit({
                payload,
                productId,
              });
            }}
            submitLabel={dict.form.updateTitle}
            title={dict.form.updateTitle}
            dict={dict.form}
          />
        </TabsContent>

        <TabsContent value="store" className="mt-0">
          <AdminSection
            title={dict.details.store.title}
            description={dict.details.store.desc}
          >
            <ProductMetadataSection
              items={[
                { label: dict.details.store.name, value: product.storeName ?? product.store?.name },
                { label: dict.details.store.id, value: product.storeId ?? product.store?.id },
                { label: dict.details.store.email, value: product.store?.email },
                { label: dict.details.store.status, value: product.store?.status },
              ]}
              dict={{ yes: dict.revisionPayload.yes, no: dict.revisionPayload.no }}
            />
          </AdminSection>
        </TabsContent>

        <TabsContent value="categories" className="mt-0">
          <AdminSection title={dict.details.tabs.categories} description={dict.details.tabs.categories}>
            <ProductCategoriesList categories={product.categories} dict={dict.revisionPayload} />
          </AdminSection>
        </TabsContent>

        <TabsContent value="images" className="mt-0">
          <AdminSection title={dict.details.tabs.images} description={dict.details.tabs.images}>
            <ProductImagesGallery images={product.images} title={product.title} dict={dict.revisionPayload} />
          </AdminSection>
        </TabsContent>

        <TabsContent value="variants" className="mt-0">
          <AdminSection title={dict.details.tabs.variants} description={dict.details.tabs.variants}>
            <ProductVariantsTable variants={product.variants} dict={dict.revisionPayload} />
          </AdminSection>
        </TabsContent>

        <TabsContent value="offer" className="mt-0">
          <AdminSection title={dict.details.tabs.offer} description={dict.details.tabs.offer}>
            <ProductOfferCard offer={product.offer} dict={dict.revisionPayload} rejectDict={dict.rejectDialog} />
          </AdminSection>
        </TabsContent>
      </Tabs>

    </div>
  );
}



