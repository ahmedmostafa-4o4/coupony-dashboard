"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  AdminPageHeader,
  AdminSection,
  AdminStatCard,
  createAdminDetailHref,
  createAdminHref,
  AdminPagination,
} from "@/features/admin/shared";

import { ProductsFilters } from "../components/products-filters";
import { ProductsTable } from "../components/products-table";
import { useProducts } from "../hooks/use-products";
import type { ProductsListFilters } from "../types/product.types";

const defaultFilters: ProductsListFilters = {
  approvalStatus: "all",
  search: "",
  status: "all",
  storeId: "",
  page: 1,
  perPage: 15,
};

export function ProductsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<ProductsListFilters>(defaultFilters);
  const listState = useProducts(filters);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={`${createAdminHref(lang, "products")}/create`}
            >
              Create product
            </Link>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Manage live catalog products from the admin dashboard."
        eyebrow="Admin"
        title="Products"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Products currently loaded from the admin products endpoint."
          label="Rows"
          value={listState.total}
        />
      </div>
      <ProductsFilters
        onChange={(newFilters) => setFilters({ ...newFilters, page: 1 })}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <ProductsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(lang, "products", String(item.id ?? ""))}
            >
              View
            </Link>
          </div>
        )}
      />

      <AdminPagination
        currentPage={Number(filters.page) || 1}
        lastPage={Number(listState.meta?.lastPage) || 0}
        perPage={Number(filters.perPage) || 15}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onPerPageChange={(perPage) =>
          setFilters({ ...filters, perPage, page: 1 })
        }
      />
    </div>
  );
}
