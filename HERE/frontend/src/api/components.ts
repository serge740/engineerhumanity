import api from './axios';
import { createCollection } from './collections';

// ── Field definition (shared by static component schema + collection schema) ─

export type ComponentFieldType = 'text' | 'textarea' | 'image' | 'url' | 'color' | 'number';

export interface ComponentField {
  key:          string;
  label:        string;
  type:         ComponentFieldType;
  placeholder?: string;
  required?:    boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export interface SiteComponent {
  id:           string;
  siteId:       string;
  name:         string;
  tag:          string;
  type:         'static' | 'dynamic';
  html:         any;          // PageElement[] — the template tree
  modalHtml:    any;          // PageElement[] | null — the detail-modal template tree (dynamic only)
  schema:       ComponentField[];  // fields for static components
  collectionId: string | null;
  collection:   { id: string; name: string; slug: string } | null;
  createdAt:    string;
  updatedAt:    string;
}

export interface CreateComponentData {
  name:          string;
  tag:           string;
  type?:         'static' | 'dynamic';
  html?:         any;
  modalHtml?:    any;
  schema?:       ComponentField[];
  collectionId?: string | null;
}

export interface UpdateComponentData {
  name?:         string;
  tag?:          string;
  type?:         'static' | 'dynamic';
  html?:         any;
  modalHtml?:    any;
  schema?:       ComponentField[];
  collectionId?: string | null;
}

const base = (siteId: string) => `/sites/${siteId}/components`;

export const getComponents  = (siteId: string) =>
  api.get<SiteComponent[]>(base(siteId)).then(r => r.data);

export const getComponent   = (siteId: string, id: string) =>
  api.get<SiteComponent>(`${base(siteId)}/${id}`).then(r => r.data);

export const createComponent = (siteId: string, data: CreateComponentData) =>
  api.post<SiteComponent>(base(siteId), data).then(r => r.data);

export const updateComponent = (siteId: string, id: string, data: UpdateComponentData) =>
  api.patch<SiteComponent>(`${base(siteId)}/${id}`, data).then(r => r.data);

export const deleteComponent = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then(r => r.data);

// Creates a dynamic component with its own private, 1:1-linked data collection.
// The Collection/Component split is an implementation detail — the UI only
// ever presents this as one thing with a Data tab and a Design tab.
export const createDynamicComponent = async (siteId: string, name: string): Promise<SiteComponent> => {
  const collection = await createCollection(siteId, { name });
  return createComponent(siteId, { name, tag: 'div', type: 'dynamic', collectionId: collection.id, html: [] });
};
