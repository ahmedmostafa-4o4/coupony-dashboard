import * as React from "react";
import { format, parse } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface AdminDateRangePickerProps {
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export function AdminDateRangePicker({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}: AdminDateRangePickerProps) {
  const params = useParams();
  const lang = params?.lang as string | undefined;
  const locale = lang === "ar" ? ar : enUS;

  // Convert standard YYYY-MM-DD string to Date
  const fromDate = fromValue ? parse(fromValue, "yyyy-MM-dd", new Date()) : undefined;
  const toDate = toValue ? parse(toValue, "yyyy-MM-dd", new Date()) : undefined;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              "w-full sm:w-[150px] justify-start text-left font-normal bg-white h-10",
              !fromDate && "text-slate-500"
            )}
          >
            <CalendarIcon className={cn("h-4 w-4", lang === "ar" ? "ml-2" : "mr-2")} />
            {fromDate ? format(fromDate, "PP", { locale }) : <span>{lang === "ar" ? "من تاريخ" : "From"}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={(date) => {
              onFromChange(date ? format(date, "yyyy-MM-dd") : "");
            }}
            initialFocus
            locale={locale}
            dir={lang === "ar" ? "rtl" : "ltr"}
          />
        </PopoverContent>
      </Popover>

      <span className="text-sm text-slate-400">{lang === "ar" ? "إلى" : "to"}</span>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              "w-full sm:w-[150px] justify-start text-left font-normal bg-white h-10",
              !toDate && "text-slate-500"
            )}
          >
            <CalendarIcon className={cn("h-4 w-4", lang === "ar" ? "ml-2" : "mr-2")} />
            {toDate ? format(toDate, "PP", { locale }) : <span>{lang === "ar" ? "إلى تاريخ" : "To"}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={(date) => {
              onToChange(date ? format(date, "yyyy-MM-dd") : "");
            }}
            initialFocus
            locale={locale}
            dir={lang === "ar" ? "rtl" : "ltr"}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
