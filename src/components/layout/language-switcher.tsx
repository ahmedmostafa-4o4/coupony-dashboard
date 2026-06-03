"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: string) => {
    if (newLang === currentLang) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center">
      <Select value={currentLang} onValueChange={switchLanguage}>
        <SelectTrigger className="h-9 w-[110px] rounded-2xl border-slate-200 bg-white shadow-sm focus:ring-slate-200 font-medium uppercase tracking-wider text-xs text-slate-600 hover:bg-slate-50">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <SelectValue placeholder="Language" />
          </div>
        </SelectTrigger>
        <SelectContent align="end" className="rounded-xl border-slate-200 min-w-[120px]">
          <SelectItem value="en" className="text-sm rounded-lg font-medium">English (EN)</SelectItem>
          <SelectItem value="ar" className="text-sm rounded-lg font-medium">العربية (AR)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
