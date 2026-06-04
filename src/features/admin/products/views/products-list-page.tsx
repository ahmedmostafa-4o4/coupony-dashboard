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

import { getProductsDictionary } from "../utils/get-dictionary";

export function ProductsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<ProductsListFilters>(defaultFilters);
  const listState = useProducts(filters);
  const dict = getProductsDictionary(lang);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={`${createAdminHref(lang, "products")}/create`}
            >
              {dict.list.create}
            </Link>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              {dict.list.reload}
            </Button>
          </>
        }
        description={dict.list.description}
        eyebrow={dict.list.eyebrow}
        title={dict.list.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint={dict.list.stats.totalHint}
          label={dict.list.stats.total}
          value={listState.total}
        />
      </div>
      <ProductsFilters
        onChange={(newFilters) => setFilters({ ...newFilters, page: 1 })}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict.filters}
        statusDict={dict.status}
      />
      {listState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <ProductsTable
        items={listState.items}
        dict={dict.productsTable}
        statusDict={dict.status}
        approvalDict={dict.status}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(lang, "products", String(item.id ?? ""))}
            >
              {dict.list.actions.view}
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

