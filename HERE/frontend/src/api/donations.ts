import api from './axios';

export type DonationStatus = 'pending' | 'succeeded' | 'failed';

export interface Donation {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  country: string;
  street: string;
  city: string;
  adminDivision: string | null;
  phone: string | null;
  currency: string;
  amount: number;
  frequency: 'once' | 'monthly';
  programArea: string;
  displayPublicly: boolean;
  dedicateTo: string | null;
  status: DonationStatus;
  stripeCheckoutSessionId: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePaymentIntentId: string | null;
  stripeInvoiceId: string | null;
  emailSentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DonationListResponse {
  items: Donation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DonationStats {
  succeededCount: number;
  failedCount: number;
  pendingCount: number;
  totalRaised: { currency: string; amount: number }[];
}

const base = '/admin/donations';

export const getAdminDonations = (params: {
  status?: DonationStatus | 'all';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}) => api.get<DonationListResponse>(base, { params }).then(r => r.data);

export const getAdminDonationStats = () =>
  api.get<DonationStats>(`${base}/stats`).then(r => r.data);

export const syncPendingDonations = () =>
  api.post<{ checked: number; updated: number }>(`${base}/sync`).then(r => r.data);

export const getAdminDonation = (id: string) =>
  api.get<Donation>(`${base}/${id}`).then(r => r.data);
