"use client";

import { MapPin, Phone, Info, Star } from "lucide-react";
import { AdminSection } from "@/features/admin/shared";
import { useStoreAddressActions } from "../hooks/use-store-address-actions";
import { useStoreAddresses } from "../hooks/use-store-addresses";
import { StoreAddressDialog } from "./store-address-dialog";
import { AdminConfirmDialog } from "@/features/admin/shared/components/admin-confirm-dialog";

export function StoreAddressesTab({
  storeId,
}: {
  storeId: string;
}) {
  const { items: addresses, isLoading, error, reload } = useStoreAddresses(storeId);
  const actions = useStoreAddressActions(storeId, async () => { await reload(); });

  if (isLoading) {
    return <div className="py-8 text-center text-sm text-slate-500">Loading addresses...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-sm text-rose-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <StoreAddressDialog
          isPending={actions.isCreating}
          onSubmit={actions.handleCreate}
        />
      </div>

      {!addresses?.length ? (
        <AdminSection description="Known store addresses and branch locations." title="Addresses">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <MapPin className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">No addresses found</h3>
            <p className="mt-1 text-sm text-slate-500">This store has not added any locations yet.</p>
          </div>
        </AdminSection>
      ) : (
        <AdminSection description="Known store addresses and branch locations." title="Addresses">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address, i) => (
              <div
                key={address.id || i}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {address.label || "Branch Location"}
                      </h3>
                      <div className="mt-0.5 flex flex-wrap gap-2">
                        {address.isDefaultShipping && (
                          <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                            <Star className="mr-1 h-3 w-3" />
                            Default Shipping
                          </span>
                        )}
                        {address.isDefaultBilling && (
                          <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
                            Default Billing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Body */}
                <div className="flex flex-1 flex-col px-5 py-4">
                  <div className="text-sm leading-relaxed text-slate-600">
                    {address.addressLine1 && <p>{address.addressLine1}</p>}
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>
                      {[address.city, address.stateProvince, address.postalCode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {address.countryCode && <p className="font-medium text-slate-900">{address.countryCode}</p>}
                  </div>

                  {/* Extras */}
                  <div className="mt-auto pt-6">
                    <div className="space-y-3 border-t border-slate-100 pt-4">
                      {address.phoneNumber && (
                        <div className="flex items-start text-sm text-slate-600">
                          <Phone className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                          <span>{address.phoneNumber}</span>
                        </div>
                      )}
                      {address.deliveryInstructions && (
                        <div className="flex items-start text-sm text-slate-600">
                          <Info className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                          <span className="line-clamp-2" title={address.deliveryInstructions}>
                            {address.deliveryInstructions}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Actions Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3 rounded-b-2xl">
                  <StoreAddressDialog
                    address={address}
                    isPending={actions.isUpdating === address.id}
                    onSubmit={(payload) => actions.handleUpdate(address.id, payload)}
                  />
                  <AdminConfirmDialog
                    title="Delete Address"
                    description={`Are you sure you want to delete ${address.label}? This action cannot be undone.`}
                    confirmLabel="Delete"
                    triggerLabel="Delete"
                    variant="danger"
                    isPending={actions.isDeleting === address.id}
                    onConfirm={async () => { await actions.handleDelete(address.id); }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      )}
    </div>
  );
}
