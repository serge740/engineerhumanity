import api from './axios';
import axios from 'axios';

export interface PageElement {
  id: string;
  tag: string;
  class?: string;
  style?: Record<string, string>;
  text?: string;
  componentRef?: string;
  assetRef?: string;
  alt?: string;
  children?: PageElement[];
  [key: string]: any;
}

export interface PageMetadata {
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface Page {
  id: string;
  siteId: string;
  slug: string;
  title: string;
  description: string | null;
  html: PageElement[];
  metadata: PageMetadata;
  published: boolean;
  isLanding: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  published: boolean;
  isLanding: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageData {
  slug?: string;
  title: string;
  description?: string;
  html?: PageElement[];
  metadata?: PageMetadata;
}

export interface UpdatePageData {
  title?: string;
  slug?: string;
  description?: string;
  html?: unknown[];
  isLanding?: boolean;
  metadata?: PageMetadata;
}

// ── Public API (no auth) ───────────────────────────────────────────────────────
const PUBLIC_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001') + '/api/public';

export const getLandingPage = () =>
  axios.get<{ slug: string; title: string }>(`${PUBLIC_BASE}/landing`).then(r => r.data);

export const getPublicPage = (slug: string) =>
  axios.get<{ slug: string; title: string; description: string | null; html: PageElement[]; metadata: PageMetadata }>(
    `${PUBLIC_BASE}/${slug}`
  ).then(r => r.data);

const base = (siteId: string) => `/sites/${siteId}/pages`;

export const getPages = (siteId: string) =>
  api.get<PageSummary[]>(base(siteId)).then((r) => r.data);

export const getPage = (siteId: string, slug: string) =>
  api.get<Page>(`${base(siteId)}/${slug}`).then((r) => r.data);

export const createPage = (siteId: string, data: CreatePageData) =>
  api.post<Page>(base(siteId), data).then((r) => r.data);

export const updatePage = (siteId: string, slug: string, data: UpdatePageData) =>
  api.patch<Page>(`${base(siteId)}/${slug}`, data).then((r) => r.data);

export const publishPage = (siteId: string, slug: string) =>
  api.post<Page>(`${base(siteId)}/${slug}/publish`).then((r) => r.data);

export const unpublishPage = (siteId: string, slug: string) =>
  api.post<Page>(`${base(siteId)}/${slug}/unpublish`).then((r) => r.data);

export const duplicatePage = (siteId: string, slug: string) =>
  api.post<Page>(`${base(siteId)}/${slug}/duplicate`).then((r) => r.data);

export const deletePage = (siteId: string, slug: string) =>
  api.delete(`${base(siteId)}/${slug}`).then((r) => r.data);
