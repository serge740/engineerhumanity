import api from './axios';

export interface SiteComponent {
  id: string;
  siteId: string;
  name: string;
  tag: string;
  html: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComponentData {
  name: string;
  tag: string;
  html?: any;
}

export interface UpdateComponentData {
  name?: string;
  tag?: string;
  html?: any;
}

const base = (siteId: string) => `/sites/${siteId}/components`;

export const getComponents = (siteId: string) =>
  api.get<SiteComponent[]>(base(siteId)).then((r) => r.data);

export const createComponent = (siteId: string, data: CreateComponentData) =>
  api.post<SiteComponent>(base(siteId), data).then((r) => r.data);

export const updateComponent = (siteId: string, id: string, data: UpdateComponentData) =>
  api.patch<SiteComponent>(`${base(siteId)}/${id}`, data).then((r) => r.data);

export const deleteComponent = (siteId: string, id: string) =>
  api.delete(`${base(siteId)}/${id}`).then((r) => r.data);
