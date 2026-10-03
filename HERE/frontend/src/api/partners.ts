import api from './axios';
import axios from 'axios';

export interface Partner {
  id: string;
  siteId: string;
  name: string;
  image: string | null;
  link: string | null;
  description: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartnerData {
  name: string;
  image?: string;
  link: string;
  description?: string;
}

export interface UpdatePartnerData {
  name?: string;
  image?: string | null;
  link?: string;
  description?: string | null;
}

// ── Public API (no auth) ────────────────────────────────────────────────────
const PUBLIC_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') + '/api/public';

export const getPublicPartners = () =>
  axios.get<Partner[]>(`${PUBLIC_BASE}/partners`).then(r => r.data);

// ── Admin API (site-scoped, authenticated) ──────────────────────────────────
const base = (siteId: string) => `/sites/${siteId}/partners`;

export const getPartners = (siteId: string) =>
  api.get<Partner[]>(base(siteId)).then(r => r.data);

export const createPartner = (siteId: string, data: CreatePartnerData) =>
  api.post<Partner>(base(siteId), data).then(r => r.data);

export const updatePartner = (siteId: string, id: string, data: UpdatePartnerData) =>
  api.patch<Partner>(`${base(siteId)}/${id}`, data).then(r => r.data);

export const deletePartner = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then(r => r.data);

export const reorderPartners = (siteId: string, items: { id: string; order: number }[]) =>
  api.post(`${base(siteId)}/reorder`, { items }).then(r => r.data);
