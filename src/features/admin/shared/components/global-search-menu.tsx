"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { adminNavigation } from "@/features/admin/shared/constants/admin-nav";
import { getGlobalDictionary } from "@/messages/get-dictionary";
import { getUsers } from "@/features/admin/users/api/get-users";
import { getStores } from "@/features/admin/stores/api/get-stores";
import { getProducts } from "@/features/admin/products/api/get-products";
import type { User } from "@/features/admin/users/types/user.types";
import type { Store } from "@/features/admin/stores/types/store.types";
import type { Product } from "@/features/admin/products/types/product.types";
import { createAdminDetailHref } from "@/features/admin/shared/constants/admin-routes";

export function GlobalSearchMenu({
  lang,
  open,
  onOpenChange,
}: {
  lang: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const dict = getGlobalDictionary(lang);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setUsers([]);
      setStores([]);
      setProducts([]);
    }
  }, [open]);

  useEffect(() => {
    let active = true;

    async function fetchResults() {
      if (!debouncedSearch || debouncedSearch.length < 2) {
        setUsers([]);
        setStores([]);
        setProducts([]);
        return;
      }

      setIsLoading(true);

      try {
        const [usersRes, storesRes, productsRes] = await Promise.allSettled([
          getUsers({ q: debouncedSearch, perPage: 3 }),
          getStores({ q: debouncedSearch, perPage: 3 }),
          getProducts({ search: debouncedSearch, perPage: 3 }),
        ]);

        if (!active) return;

        if (usersRes.status === "fulfilled") {
          setUsers(usersRes.value.items);
        }
        if (storesRes.status === "fulfilled") {
          setStores(storesRes.value.items);
        }
        if (productsRes.status === "fulfilled") {
          setProducts(productsRes.value.items);
        }
      } catch (error) {
        // ignore errors
      } finally {
        if (active) setIsLoading(false);
      }
    }

    fetchResults();

    return () => {
      active = false;
    };
  }, [debouncedSearch]);

  const navItems = useMemo(() => {
    return adminNavigation.flatMap((group) => group.items);
  }, []);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={dict.admin.globalSearch.placeholder}
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          {isLoading
            ? dict.admin.globalSearch.loading
            : dict.admin.globalSearch.noResults}
        </CommandEmpty>

        {(!search || navItems.length > 0) && (
          <CommandGroup heading={dict.admin.globalSearch.navigation}>
            {navItems.map((item) => {
              const label = dict.items[item.key as keyof typeof dict.items]?.label || item.label;
              return (
                <CommandItem
                  key={item.key}
                  value={`nav-${label}`}
                  onSelect={() => handleSelect(item.href(lang))}
                >
                  <div className="flex flex-col">
                    <span>{label}</span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {users.length > 0 && (
          <CommandGroup heading={dict.admin.globalSearch.users}>
            {users.map((user) => (
              <CommandItem
                key={user.id}
                value={`user-${user.id}-${user.name}`}
                onSelect={() =>
                  handleSelect(createAdminDetailHref(lang, "users", user.id))
                }
              >
                <div className="flex flex-col">
                  <span>
                    {user.fullName || user.name || user.email}
                  </span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {stores.length > 0 && (
          <CommandGroup heading={dict.admin.globalSearch.stores}>
            {stores.map((store) => (
              <CommandItem
                key={store.id}
                value={`store-${store.id}-${store.name}`}
                onSelect={() =>
                  handleSelect(createAdminDetailHref(lang, "stores", store.id))
                }
              >
                <div className="flex flex-col">
                  <span>{store.name}</span>
                  <span className="text-xs text-slate-500">
                    {store.email || store.status}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {products.length > 0 && (
          <CommandGroup heading={dict.admin.globalSearch.products}>
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={`product-${product.id}-${product.title}`}
                onSelect={() =>
                  handleSelect(createAdminDetailHref(lang, "products", product.id))
                }
              >
                <div className="flex flex-col">
                  <span>{product.title as string}</span>
                  <span className="text-xs text-slate-500">
                    SKU: {product.sku || "N/A"}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
