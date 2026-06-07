"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { BannersDictionary } from "../utils/get-dictionary";
import type { Banner } from "../types/banner.types";
import type { UpdateBannerRequest } from "../types/banner.types";

export function BannerUpdateForm({
  banner,
  onUpdate,
  isPending,
  dict,
}: {
  banner: Banner;
  onUpdate: (payload: UpdateBannerRequest) => Promise<void>;
  isPending: boolean;
  dict: BannersDictionary;
}) {
  const [priority, setPriority] = useState<number>(banner.priority);
  const [isActive, setIsActive] = useState<boolean>(banner.isActive);

  const handleSave = async () => {
    await onUpdate({
      priority,
      is_active: isActive,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="priority" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{dict.details.priority}</label>
          <Input
            id="priority"
            type="number"
            min={0}
            max={1000}
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value) || 0)}
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{dict.details.isActive}</label>
          <div className="flex h-10 items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="isActive"
                checked={isActive}
                onChange={() => setIsActive(true)}
                disabled={isPending}
                className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-600"
              />
              Yes
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="isActive"
                checked={!isActive}
                onChange={() => setIsActive(false)}
                disabled={isPending}
                className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-600"
              />
              No
            </label>
          </div>
        </div>
      </div>
      <Button 
        onClick={handleSave} 
        disabled={isPending || (priority === banner.priority && isActive === banner.isActive)}
        className="w-full"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle className="mr-2 h-4 w-4" />
        )}
        {dict.details.updateBtn}
      </Button>
    </div>
  );
}
