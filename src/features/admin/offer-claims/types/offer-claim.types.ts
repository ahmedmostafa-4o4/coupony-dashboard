export interface OfferClaim {
  id: string;
  userId: string;
  storeId: string;
  productId: string;
  offerId: string;
  status: 'active' | 'redeemed' | 'cancelled' | 'expired';
  cancellationReason: string | null;
  claimToken: string;
  qrCodeToken: string;
  expiresAt: string | null;
  redeemedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  store?: {
    id: string;
    name: string;
  };
  product?: {
    id: string;
    title: string;
  };
  offer?: {
    id: string;
    label: string;
  };
}

export interface OfferClaimsFilters {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  status?: string;
  userId?: string;
  storeId?: string;
  startDate?: string;
  endDate?: string;
}
