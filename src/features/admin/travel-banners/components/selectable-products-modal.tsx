"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { AdminDataTable, type AdminColumn, AdminPagination } from "@/features/admin/shared";
import { useSelectableProducts } from "../hooks/use-selectable-products";
import type { SelectableProduct, SelectableProductsFilters } from "../types/travel-banner.types";
import type { TravelBannersDictionary } from "../utils/get-dictionary";

export function SelectableProductsModal({
  isOpen,
  onClose,
  onSelect,
  dict,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: SelectableProduct) => void;
  dict: TravelBannersDictionary;
}) {
  const [filters, setFilters] = useState<SelectableProductsFilters>({
    page: 1,
    perPage: 5,
    search: "",
    min_price: 0,
    max_price: 5000,
  });

  const listState = useSelectableProducts(filters, isOpen);

  const columns: AdminColumn<SelectableProduct>[] = [
    {
      id: "product",
      header: dict.modal.columns.product,
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-slate-200">
            {item.image ? (
              <img src={item.image.startsWith('http') ? item.image : `https://api.coupony.shop/storage/${item.image}`} alt={item.title} className="object-cover w-full h-full" />
            ) : (
              <div className="h-full w-full bg-slate-100" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span 
                className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'active' ? 'bg-green-500' : 'bg-slate-300'}`} 
                title={item.status} 
              />
              <p 
                className="font-medium text-slate-900 truncate max-w-[150px] sm:max-w-[200px]" 
                title={item.shortDescription || item.title}
              >
                {item.title}
              </p>
            </div>
            {item.store?.name && (
              <p className="text-xs text-slate-500 truncate mt-0.5">{item.store.name}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "categories",
      header: "Categories",
      className: "hidden md:table-cell",
      cell: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.categories?.map((cat) => (
            <span key={cat.id} className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
              {cat.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "offer",
      header: "Offer",
      cell: (item) => (
        <div className="flex items-center">
          {item.hasOffer ? (
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600 ring-1 ring-inset ring-red-500/10 whitespace-nowrap">
              {item.offer?.discountType === 'percentage' 
                ? `${Number(item.offer.discountValue)}% OFF` 
                : item.offer?.discountType === 'fixed' 
                ? `${Number(item.offer.discountValue)} EGP OFF` 
                : item.offer?.discountType === 'buy_x_get_y' 
                ? 'Buy X Get Y' 
                : 'OFFER'}
            </span>
          ) : (
            <span className="text-slate-400 text-sm">-</span>
          )}
        </div>
      ),
    },
    {
      id: "price",
      header: dict.modal.columns.price,
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-700">{item.basePrice} EGP</span>
          {item.compareAtPrice && (
            <span className="text-xs text-slate-400 line-through">{item.compareAtPrice} EGP</span>
          )}
        </div>
      ),
    },
    {
      id: "rating",
      header: dict.modal.columns.rating,
      className: "hidden sm:table-cell",
      cell: (item) => (
        <div className="text-sm text-slate-600 flex flex-col">
          <span>★ {item.ratingAvg || "N/A"}</span>
          <span className="text-xs text-slate-400">({item.favoritesCount} favs)</span>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{dict.modal.title}</DialogTitle>
          <DialogDescription>{dict.modal.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium leading-none">{dict.filters.search}</label>
              <Input
                placeholder="Search products..."
                value={filters.search || ""}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700 leading-none">Price Range</label>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative flex-1 w-full sm:w-auto">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">Min</span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={filters.min_price || ""}
                    onChange={(e) => setFilters({ ...filters, min_price: Number(e.target.value) || 0, page: 1 })}
                    className="pl-11 pr-8 text-sm bg-slate-50 border-slate-200 focus-visible:ring-offset-0 focus-visible:ring-1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EGP</span>
                </div>
                <div className="h-px w-4 bg-slate-300 shrink-0 hidden sm:block" />
                <div className="relative flex-1 w-full sm:w-auto">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">Max</span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="5000"
                    value={filters.max_price || ""}
                    onChange={(e) => setFilters({ ...filters, max_price: Number(e.target.value) || 0, page: 1 })}
                    className="pl-12 pr-8 text-sm bg-slate-50 border-slate-200 focus-visible:ring-offset-0 focus-visible:ring-1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">EGP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] w-full max-w-full overflow-hidden">
            <div className={listState.isLoading ? "opacity-50 pointer-events-none transition-opacity overflow-x-auto w-full" : "transition-opacity overflow-x-auto w-full"}>
              <AdminDataTable
                columns={columns}
                data={listState.items}
                rowKey={(item) => item.id}
                emptyTitle="No products found"
                emptyDescription="Try adjusting your filters."
                renderRowActions={(item) => (
                  <Button size="sm" onClick={() => onSelect(item)}>
                    {dict.modal.actions.select}
                  </Button>
                )}
              />
              <AdminPagination
                currentPage={(filters.page as number) || 1}
                onPageChange={(p) => setFilters({ ...filters, page: p })}
                onPerPageChange={(p) => setFilters({ ...filters, perPage: p, page: 1 })}
                perPage={(filters.perPage as number) || 5}
                lastPage={
                  ((listState.meta as any)?.last_page as number as any) ||
                  Math.ceil(listState.total / ((filters.perPage as number) || 5)) ||
                  1
                }
              />
            </div>
            {listState.isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
