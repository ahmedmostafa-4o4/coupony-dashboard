"use client";

import { useRouter } from "next/navigation";

import { PageLoading } from "@/components/shared/page-loading";
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

export function ProductDetailsPage({
  productId,
  lang,
}: {
  productId: string;
  lang: string;
}) {
  const router = useRouter();
  const detailState = useProductDetails(productId);
  const actions = useProductActions(async () => {
    await detailState.reload();
  });

  if (detailState.isLoading) {
    return <PageLoading label="Loading product details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Product not found">
        <p className="text-sm text-slate-500">
          The backend did not return a product for this route.
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
            <ProductStatusBadge value={product.status} />
            <ProductApprovalStatusBadge
              value={product.approvalStatusLabel ?? product.approvalStatus}
            />
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will permanently remove the product, then return you to the products list."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                const result = await actions.deleteAction.submit(productId);

                if (result) {
                  router.replace(createAdminHref(lang, "products"));
                }
              }}
              title="Delete Product"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        }
        description="Inspect and update the live product payload returned by the admin API."
        eyebrow="Admin details"
        title={getAdminEntityTitle(product, productId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      {actions.updateAction.error ? (
        <AdminSection title="Update error">
          <p className="text-sm text-rose-600">{actions.updateAction.error}</p>
        </AdminSection>
      ) : null}
      {actions.deleteAction.error ? (
        <AdminSection title="Delete error">
          <p className="text-sm text-rose-600">{actions.deleteAction.error}</p>
        </AdminSection>
      ) : null}

      <AdminSection
        title="Overview"
        description="High-level product summary for quick admin review."
      >
        <ProductSummaryCards product={product} />
      </AdminSection>

      <AdminSection
        title="Product status"
        description="Lifecycle and moderation state for this live product."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Product status
            </p>
            <div className="mt-2">
              <ProductStatusBadge value={product.status} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Approval
            </p>
            <div className="mt-2">
              <ProductApprovalStatusBadge
                value={product.approvalStatusLabel ?? product.approvalStatus}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Featured
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {product.featuredLabel ?? "Standard"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Currency
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {product.currency ?? "—"}
            </p>
          </div>
        </div>
      </AdminSection>

      <ProductForm
        description="Update the live product fields supported by the admin product update contract."
        initialValues={product}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            payload,
            productId,
          });
        }}
        submitLabel="Update product"
        title="Update product"
      />

      <AdminSection
        title="Store information"
        description="Store payload returned alongside the product, when available."
      >
        <ProductMetadataSection
          items={[
            { label: "Store name", value: product.storeName ?? product.store?.name },
            { label: "Store ID", value: product.storeId ?? product.store?.id },
            { label: "Store email", value: product.store?.email },
            { label: "Store status", value: product.store?.status },
          ]}
        />
      </AdminSection>

      <AdminSection title="Categories" description="Categories attached to this product.">
        <ProductCategoriesList categories={product.categories} />
      </AdminSection>

      <AdminSection title="Images" description="Image gallery for this product.">
        <ProductImagesGallery images={product.images} title={product.title} />
      </AdminSection>

      <AdminSection title="Variants" description="Variant payload returned for this product.">
        <ProductVariantsTable variants={product.variants} />
      </AdminSection>

      <AdminSection title="Offer" description="Offer payload attached to this product, when available.">
        <ProductOfferCard offer={product.offer} />
      </AdminSection>

      <AdminSection title="Metadata" description="Reference metadata and identifiers for this live product.">
        <ProductMetadataSection
          items={[
            { label: "Product ID", value: product.id },
            { label: "Slug", value: product.slug },
            { label: "SKU", value: product.sku },
            { label: "Created", value: product.createdAt },
            { label: "Updated", value: product.updatedAt },
            {
              label: "Pending revision",
              value: product.pendingRevision ? "Available" : "None",
            },
          ]}
        />
      </AdminSection>

    </div>
  );
}


