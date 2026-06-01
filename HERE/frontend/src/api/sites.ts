import api from './axios';

export interface SiteMetadata {
  title?: string;
  description?: string;
  favicon?: string;
}

export interface Site {
  id: string;
  adminId: string;
  name: string;
  domain: string | null;
  metadata: SiteMetadata;
  globalCSS: string;
  globalJS: string;
  version: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { pages: number; components: number; assets: number };
  pages?: PageInSite[];
  components?: ComponentInSite[];
  assets?: AssetInSite[];
}

export interface PageInSite {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  version: number;
  updatedAt: string;
}

export interface ComponentInSite {
  id: string;
  name: string;
  tag: string;
  html: any;
  createdAt: string;
  updatedAt: string;
}

export interface AssetInSite {
  id: string;
  type: string;
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

export interface CreateSiteData {
  name: string;
  domain?: string;
  metadata?: SiteMetadata;
  globalCSS?: string;
  globalJS?: string;
}

export interface UpdateSiteData {
  name?: string;
  domain?: string;
  metadata?: SiteMetadata;
  globalCSS?: string;
  globalJS?: string;
  published?: boolean;
}

export const getSites = () =>
  api.get<Site[]>('/sites').then((r) => r.data);

export const getSite = (id: string) =>
  api.get<Site>(`/sites/${id}`).then((r) => r.data);

export const createSite = (data: CreateSiteData) =>
  api.post<Site>('/sites', data).then((r) => r.data);

export const updateSite = (id: string, data: UpdateSiteData) =>
  api.patch<Site>(`/sites/${id}`, data).then((r) => r.data);

export const deleteSite = (id: string) =>
  api.delete(`/sites/${id}`).then((r) => r.data);
