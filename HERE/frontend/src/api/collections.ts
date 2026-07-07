import api from './axios';
import type { ComponentField } from './components';

export interface CollectionItem {
  id: string;
  collectionId: string;
  data: Record<string, unknown>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteCollection {
  id: string;
  siteId: string;
  name: string;
  slug: string;
  fields: ComponentField[];
  createdAt: string;
  updatedAt: string;
  items?: CollectionItem[];
  _count?: { items: number };
}

export interface CreateCollectionData {
  name: string;
  slug?: string;
  fields?: ComponentField[];
}

export interface UpdateCollectionData {
  name?: string;
  fields?: ComponentField[];
}

const base = (siteId: string) => `/sites/${siteId}/collections`;

export const getCollections = (siteId: string) =>
  api.get<SiteCollection[]>(base(siteId)).then(r => r.data);

export const getCollection = (siteId: string, id: string) =>
  api.get<SiteCollection>(`${base(siteId)}/${id}`).then(r => r.data);

export const createCollection = (siteId: string, data: CreateCollectionData) =>
  api.post<SiteCollection>(base(siteId), data).then(r => r.data);

export const updateCollection = (siteId: string, id: string, data: UpdateCollectionData) =>
  api.patch<SiteCollection>(`${base(siteId)}/${id}`, data).then(r => r.data);

export const deleteCollection = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then(r => r.data);

export const getCollectionItems = (siteId: string, collectionId: string) =>
  api.get<CollectionItem[]>(`${base(siteId)}/${collectionId}/items`).then(r => r.data);

export const createCollectionItem = (siteId: string, collectionId: string, data: Record<string, unknown>) =>
  api.post<CollectionItem>(`${base(siteId)}/${collectionId}/items`, { data }).then(r => r.data);

export const updateCollectionItem = (
  siteId: string,
  collectionId: string,
  itemId: string,
  patch: { data?: Record<string, unknown>; order?: number },
) =>
  api.patch<CollectionItem>(`${base(siteId)}/${collectionId}/items/${itemId}`, patch).then(r => r.data);

export const deleteCollectionItem = (siteId: string, collectionId: string, itemId: string) =>
  api.delete(`${base(siteId)}/${collectionId}/items/${itemId}`).then(r => r.data);

export const reorderCollectionItems = (
  siteId: string,
  collectionId: string,
  items: { id: string; order: number }[],
) =>
  api.post(`${base(siteId)}/${collectionId}/items/reorder`, { items }).then(r => r.data);
