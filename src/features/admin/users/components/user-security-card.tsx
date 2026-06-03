"use client";

import { ShieldCheck, Calendar, Globe, AlertOctagon } from "lucide-react";

import { AdminSection } from "@/features/admin/shared";
import type { UsersDictionary } from "../utils/get-dictionary";

interface UserSecurityCardProps {
  lastLoginAt?: string | null;
  lastIp?: string | null;
  onRevokeAllSessions: () => Promise<void>;
  isRevoking: boolean;
  hasActiveSessions: boolean;
}

export function UserSecurityCard({
  lastLoginAt,
  lastIp,
  onRevokeAllSessions,
  isRevoking,
  hasActiveSessions,
  dict,
}: UserSecurityCardProps & { dict: UsersDictionary["security"] }) {
  return (
    <AdminSection title={dict.title} description={dict.description}>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:border-slate-800">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <h3 className="font-semibold leading-none tracking-tight">{dict.overview}</h3>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-slate-500 flex items-center">
                <Calendar className="mr-1.5 h-4 w-4" /> {dict.lastLogin}
              </span>
              <span className="text-sm">
                {lastLoginAt ? new Date(lastLoginAt).toLocaleString() : dict.neverLoggedIn}
              </span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-slate-500 flex items-center">
                <Globe className="mr-1.5 h-4 w-4" /> {dict.lastIp}
              </span>
              <span className="text-sm" dir="ltr">
                {lastIp || dict.unknown}
              </span>
            </div>
            
            <div className="flex flex-col justify-center sm:col-span-2 lg:col-span-1 lg:items-end">
              {hasActiveSessions ? (
                <button
                  onClick={() => void onRevokeAllSessions()}
                  disabled={isRevoking}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-rose-600 text-white hover:bg-rose-700 h-10 px-4 py-2 w-full lg:w-auto"
                >
                  <AlertOctagon className="mr-2 h-4 w-4" />
                  {dict.revokeAll}
                </button>
              ) : (
                <span className="text-sm text-slate-500 italic">{dict.noActive}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}
