"use client";

import { UserCircle, Mail, Phone, Calendar, ShieldCheck } from "lucide-react";
import { AdminSection } from "@/features/admin/shared";
import type { StoreOwner } from "../types/store.types";
import type { StoresDictionary } from "../utils/get-dictionary";
import { format } from "date-fns";

export function StoreOwnerCard({ owner, dict }: { owner?: StoreOwner | null; dict: StoresDictionary["details"]["owner"] }) {
  if (!owner) {
    return (
      <AdminSection description={dict.desc} title={dict.title}>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <UserCircle className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-slate-900">{dict.unassigned}</h3>
          <p className="mt-1 text-sm text-slate-500"></p>
        </div>
      </AdminSection>
    );
  }

  const profile = owner.profile;
  const fullName = owner.fullName || [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") || "Unnamed User";
  
  return (
    <AdminSection description={dict.desc} title={dict.title}>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header / Avatar */}
        <div className="bg-slate-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100">
          <div className="shrink-0">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={fullName}
                className="h-24 w-24 rounded-full border-4 border-white bg-slate-100 object-cover shadow-sm ring-1 ring-slate-900/5"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-slate-100 shadow-sm ring-1 ring-slate-900/5">
                <UserCircle className="h-12 w-12 text-slate-400" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center sm:items-start flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{fullName}</h3>
              {owner.status === "active" && (
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              )}
            </div>
            
            <p className="mt-1 text-sm font-medium text-slate-500">
              User ID: {owner.id}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {owner.status && (
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  owner.status === 'active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 
                  'bg-slate-100 text-slate-700 ring-slate-500/20'
                }`}>
                  {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                </span>
              )}
              {profile?.gender && (
                <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                  {profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info & Details */}
        <div className="grid gap-0 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-6 sm:p-8 space-y-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Information</h4>
            <div className="space-y-4">
              {owner.email && (
                <div className="flex items-center text-sm text-slate-700">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 mr-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="sr-only">{dict.email}</span>
                  {owner.email}
                </div>
              )}
              {owner.phoneNumber && (
                <div className="flex items-center text-sm text-slate-700">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 mr-3">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  {owner.phoneNumber}
                </div>
              )}
              {profile?.dateOfBirth && (
                <div className="flex items-center text-sm text-slate-700">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 mr-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                  </div>
                  {format(new Date(profile.dateOfBirth), "MMMM d, yyyy")}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Bio & Notes</h4>
            {profile?.bio ? (
              <p className="text-sm leading-relaxed text-slate-600 italic">
                "{profile.bio}"
              </p>
            ) : (
              <p className="text-sm text-slate-400 italic">No bio provided.</p>
            )}
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                {dict.joined} {owner.createdAt ? format(new Date(owner.createdAt), "MMM d, yyyy") : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}
