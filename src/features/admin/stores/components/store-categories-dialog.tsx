"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { getStoreCategories } from "@/features/admin/store-categories/api/get-store-categories";
import { Check, Plus } from "lucide-react";

import type { StoresDictionary } from "../utils/get-dictionary";

interface StoreCategoriesDialogProps {
  currentCategoryIds: (string | number)[];
  isPending: boolean;
  onAttach: (categoryId: string | number) => Promise<boolean>;
  dict: StoresDictionary["details"]["categories"];
}

export function StoreCategoriesDialog({
  currentCategoryIds,
  isPending,
  onAttach,
  dict,
}: StoreCategoriesDialogProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && categories.length === 0) {
      setIsLoading(true);
      getStoreCategories({ perPage: 100 })
        .then((res) => {
          setCategories(res.items);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, categories.length]);

  const availableCategories = categories.filter(
    (c) => !currentCategoryIds.includes(c.id) && !currentCategoryIds.includes(Number(c.id))
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {dict.assign}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dict.assignTitle}</DialogTitle>
          <DialogDescription>
            {dict.assignDesc}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="text-center text-sm text-slate-500">Loading categories...</div>
          ) : availableCategories.length === 0 ? (
            <div className="text-center text-sm text-slate-500">
              No more categories available to add.
            </div>
          ) : (
            <div className="grid gap-2 max-h-[60vh] overflow-y-auto pr-2">
              {availableCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                >
                  <div className="flex items-center gap-3">
                    {cat.iconUrl ? (
                      <img src={cat.iconUrl} alt="" className="h-6 w-6 object-contain" />
                    ) : (
                      <div className="h-6 w-6 rounded-md bg-slate-100" />
                    )}
                    <span className="text-sm font-medium">{cat.name || cat.nameEn || cat.nameAr}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                    onClick={async () => {
                      const success = await onAttach(cat.id);
                      if (success) {
                        setOpen(false);
                      }
                    }}
                  >
                    {dict.assign}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
