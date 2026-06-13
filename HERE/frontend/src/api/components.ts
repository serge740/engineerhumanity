import api from './axios';

// ── Field definition (shared by static component schema + collection schema) ─

export interface ComponentField {
  key:          string;
  label:        string;
  type:         'text' | 'textarea' | 'image' | 'url' | 'color' | 'number';
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
  schema?:       ComponentField[];
  collectionId?: string | null;
}

export interface UpdateComponentData {
  name?:         string;
  tag?:          string;
  type?:         'static' | 'dynamic';
  html?:         any;
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
