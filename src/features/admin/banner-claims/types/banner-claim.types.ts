export interface BannerClaim {
  id: string;
  userId: string;
  storeId: string;
  bannerId: string;
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
  banner?: {
    id: string;
    title: string;
  };
}

export interface BannerClaimsFilters {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  status?: string;
  userId?: string;
  storeId?: string;
  startDate?: string;
  endDate?: string;
}
