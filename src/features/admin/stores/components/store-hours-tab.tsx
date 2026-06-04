"use client";

import { Clock } from "lucide-react";
import { AdminSection } from "@/features/admin/shared";
import type { StoreHours } from "../types/store.types";
import type { StoresDictionary } from "../utils/get-dictionary";

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function StoreHoursTab({ hours, dict }: { hours?: StoreHours[]; dict: StoresDictionary["details"]["hours"] }) {
  if (!hours?.length) {
    return (
      <AdminSection description={dict.desc} title={dict.title}>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Clock className="h-6 w-6 text-slate-400" />
          </div>
          <p className="mt-1 text-sm text-slate-500">{dict.none}</p>
        </div>
      </AdminSection>
    );
  }

  // Sort hours by dayOfWeek just in case they are out of order
  const sortedHours = [...hours].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

  return (
    <AdminSection description={dict.desc} title={dict.title}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100">
          {sortedHours.map((hour, i) => {
            const dayName = DAYS_OF_WEEK[hour.dayOfWeek] || `Day ${hour.dayOfWeek}`;
            
            return (
              <li key={hour.id || i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-24">
                    {dayName}
                  </span>
                </div>
                
                <div className="flex flex-1 justify-end">
                  {hour.isClosed ? (
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {dict.closed}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-slate-700">
                      {hour.openTime ? hour.openTime.substring(0, 5) : "00:00"} — {hour.closeTime ? hour.closeTime.substring(0, 5) : "23:59"}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AdminSection>
  );
}
