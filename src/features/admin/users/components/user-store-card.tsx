"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createAdminHref, AdminStatusBadge } from "@/features/admin/shared";
import type { UserStoreSummary } from "../types/user.types";
import type { UsersDictionary } from "../utils/get-dictionary";
import { ExternalLink, Mail, Phone, ShieldCheck, ShieldAlert } from "lucide-react";

export function UserStoreCard({ store, dict }: { store: UserStoreSummary; dict: UsersDictionary["storeCard"] }) {
  const { lang } = useParams<{ lang: string }>();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Banner */}
      <div className="relative h-32 w-full bg-slate-100">
        {store.bannerUrl ? (
          <Image
            src={store.bannerUrl}
            alt={`${store.name} banner`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-50" />
        )}
      </div>

      <div className="px-6 pb-6 pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative -mt-10 h-16 w-16 shrink-0 overflow-hidden rounded-xl border-4 border-white bg-slate-50 shadow-sm">
              {store.logoUrl ? (
                <Image
                  src={store.logoUrl}
                  alt={`${store.name} logo`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-50 text-xl font-bold text-indigo-500">
                  {store.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                {store.name}
                {store.isVerified ? (
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                )}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <AdminStatusBadge value={store.status} />
                {store.subscriptionTier && (
                  <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-indigo-600">
                    {store.subscriptionTier}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Link
            href={`${createAdminHref(lang, "stores")}/${store.id}`}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50"
          >
            {dict.viewStore} <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </div>

        {store.description && (
          <p className="mt-4 line-clamp-2 text-sm text-slate-600">
            {store.description}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:gap-6">
          {store.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{store.email}</span>
            </div>
          )}
          {store.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-400" />
              <span dir="ltr">{store.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
